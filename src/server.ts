import cors from "cors";
import express from "express";
import * as fs from "fs";
import * as path from "path";
import template from "lodash.template";
import zip from "lodash.zip";
import bodyParser from "body-parser";
import Ajv from "ajv";
import fetch from "node-fetch";
import { CodeModel } from "./mongo/codes";
import { RecordModel } from "./mongo/records";
import "./mongo";
import { SteamStats } from "./mongo/steamStats";
import { GameModel, IGame } from "./mongo/games";

const app = express();
const ajv = new Ajv();

const compile = template(
  fs.readFileSync(path.join(__dirname, "dist/index.html"))
);

const page = compile({
  inject: `
    <script>
      window.gamesLoaded(${fs.readFileSync(
        path.join(__dirname, "dist/games.json")
      )})
      window.challengesLoaded(${fs.readFileSync(
        path.join(__dirname, "dist/challenges.json")
      )})
    </script>
  `,
});

const codesChecker = ajv.compile({
  required: ["contact", "answers", "uid"],
  properties: {
    contact: { type: "string" },
    answers: {
      type: "array",
      maxItems: 5,
      minItems: 5,
      items: { type: "string" },
    },
    uid: {
      type: "string",
    },
  },
});

app.use("/public", express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/stats", async (req, res) => {
  console.log(req.body);
  const realCodes = (await CodeModel.findOne().lean().exec()).codes;
  const users = await RecordModel.find({}).lean().exec();
  const stats = realCodes.map(
    (real, idx) => users.filter((cur) => cur.answers[idx] === real).length
  );
  console.log(stats);
  res.json({
    error: false,
    stats,
    passed: users.filter((user) => user.answers.every(Boolean)).length,
    total: users.length,
  });
});

app.post("/api/results", async (req, res) => {
  console.log(req.body);
  const user = await RecordModel.findOne({ uid: req.body.uid || "" })
    .lean()
    .exec();
  console.log(user);

  res.json({
    error: false,
    contact: (user && user.contact) || null,
    answers: (user && user.answers) || [null, null, null, null, null],
  });
});

app.post("/api/check", async (req, res) => {
  console.log(req.body);
  if (!codesChecker(req.body)) return res.status(400).json({ error: true });

  let user = await RecordModel.findOne({ uid: req.body.uid }).exec();
  if (!user)
    user = new RecordModel({
      uid: req.body.uid,
      contact: req.body.contact,
      answers: [null, null, null, null, null],
    });

  const realCodes = (await CodeModel.findOne().lean().exec()).codes;

  const results = zip(realCodes, req.body.answers, user.answers).map(
    ([real, provided, userAnswer]: [string, string, boolean]) => {
      if (userAnswer) {
        return userAnswer;
      }
      if (real.toLowerCase() === provided.trim().toLowerCase()) {
        return real;
      }
      return null;
    }
  );

  user.answers = results;
  user.contact = req.body.contact;
  user.save();

  res.status(200).json({
    error: false,
    answers: results,
  });
});

const STEAM_API_KEY = "1DF91CA29B8B5A056B77A5FFA3B47EEE";

app.get("/api/steam/:id", async (req, res) => {
  try {
    const q = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${req.params.id}&format=json&key=${STEAM_API_KEY}`
    );
    const json = await q.json();
    res.status(200).json({
      error: false,
      game: json,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(null);
  }
});

app.get("/api/contestants", async (req, res) => {
  const list = await RecordModel.aggregate([
    {
      $unwind: {
        path: "$answers",
        includeArrayIndex: "idx",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          contact: "$contact",
          idx: "$idx",
        },
        all_answers: {
          $push: "$answers",
        },
      },
    },
    {
      $sort: {
        "_id.idx": 1,
        "_id.contact": 1,
      },
    },
    {
      $group: {
        _id: "$_id.contact",
        answers: {
          $push: {
            $reduce: {
              input: "$all_answers",
              initialValue: null,
              in: {
                $cond: {
                  if: {
                    $and: [
                      { $eq: ["$$value", null] },
                      { $ne: ["$$this", null] },
                    ],
                  },
                  then: "$$this",
                  else: "$$value",
                },
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        contact: "$_id",
        passed: {
          $allElementsTrue: "$answers",
        },
      },
    },
  ]).exec();

  res.json(list);
});

app.get("/api/games", async (req, res) => {
  const games = await GameModel.find({}).lean().exec();
  res.json(games);
});

app.post("/api/refreshGames", async (req, res) => {
  if (req.body.password !== process.env.API_SECRET) return res.sendStatus(404);
  const games = await GameModel.find({});

  let icons = await fetch(
    "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1" +
      "?key=1DF91CA29B8B5A056B77A5FFA3B47EEE&steamid=76561198148828491&" +
      "include_appinfo=1&include_played_free_games=1&include_free_sub=1&format=json",
    { method: "GET" }
  ).then((x) => x.json());

  const abouts = await Promise.all(
    games.map((game) =>
      fetch(
        `https://store.steampowered.com/api/appdetails` +
          `?key=${STEAM_API_KEY}&appids=${game.appid}&filters=basic&cc=ru&l=ru`,
        {
          method: "GET",
          headers: {
            "Accept-Language": "ru-RU, ru;q=0.9, en;q=0.5, *;q=0.3",
          },
        }
      )
        .then((r) => r.json())
        .then((e) => ({
          id: game.appid,
          about:
            e[game.appid] &&
            e[game.appid].data &&
            e[game.appid].data.short_description,
        }))
    )
  );

  let data = [];
  for (const x of icons.response.games) {
    const game = games.find((game) => game.appid === x.appid);
    if (game) {
      data.push({
        tier: game.tier || "Meme",
        review: game.review || "",
        appid: x.appid,
        name: x.name,
        video: game.video || null,
        steam: {
          icon: x.img_icon_url,
          logo: x.img_logo_url,
          about: abouts.find((e) => e.id === x.appid).about,
        },
      });
    }
  }

  const inserts = data.map((x) => ({
    updateOne: {
      filter: { appid: x.appid },
      update: x,
      upsert: true,
    },
  }));

  await GameModel.bulkWrite(inserts, {
    ordered: false,
    w: 1,
    bypassDocumentValidation: true,
  });

  res.json({ success: true });
});

app.get("/twitch", (req, res) => {
  res.redirect(301, "https://twitch.tv/kelin2025");
});

app.get("/twitch/subscribe", (req, res) => {
  res.redirect(301, "https://twitch.tv/products/kelin2025");
});

app.get("/youtube", (req, res) => {
  res.redirect(301, "https://youtube.com/kelin2025");
});

app.get("/youtube/sponsorship", (req, res) => {
  res.redirect(
    301,
    "https://youtube.com/channel/UCGEDINS5Pz6FTVaZqfU6kMg/join"
  );
});

app.get("/discord", (req, res) => {
  res.redirect(302, "https://discord.gg/ZNxXVs9");
});

app.get("/donate", (req, res) => {
  res.redirect(301, "https://www.donationalerts.com/r/kelin2025");
});

app.get("/requests", async (req, res) => {
  res.redirect(
    302,
    "https://www.notion.so/kelin2025/448abae4a5654b7496c85745030a0152"
  );
});

app.get<{ game_id: string }>("/steam/:game_id", async (req, res) => {
  await SteamStats.updateOne(
    {
      app_id: req.params.game_id,
    },
    {
      $setOnInsert: {
        app_id: req.params.game_id,
      },
      $inc: {
        clicks: 1,
      },
    },
    {
      upsert: true,
    }
  ).exec();
  res.redirect(301, `https://store.steampowered.com/app/${req.params.game_id}`);
});

app.get("*", (req, res) => {
  res.send(page);
});

app.listen(process.env.PORT || 8080, () => console.log("Listening!"));
