import cors from "cors";
import express from "express";
import * as fs from "fs";
import * as path from "path";
import template from "lodash.template";
import zip from "lodash.zip";
import bodyParser from "body-parser";
import Ajv from "ajv";
import { CodeModel } from "~mongo/codes";
import { RecordModel } from "~mongo/records";
import "./mongo";

const app = express();
const ajv = new Ajv();

const compile = template(
  fs.readFileSync(path.join(__dirname, "dist/index.html"))
);

const page = compile({
  inject: `
    <script>
      globalThis.gamesLoaded(${fs.readFileSync(
        path.join(__dirname, "dist/games.json")
      )})
      globalThis.challengesLoaded(${fs.readFileSync(
        path.join(__dirname, "dist/challenges.json")
      )})
    </script>
  `
});

const codesChecker = ajv.compile({
  required: ["contact", "answers", "uid"],
  properties: {
    contact: { type: "string" },
    answers: {
      type: "array",
      maxItems: 5,
      minItems: 5,
      items: { type: "string" }
    },
    uid: {
      type: "string"
    }
  }
});

app.use("/public", express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/stats", async (req, res) => {
  console.log(req.body);
  const realCodes = (
    await CodeModel.findOne()
      .lean()
      .exec()
  ).codes;
  const users = await RecordModel.find({})
    .lean()
    .exec();
  const stats = realCodes.map(
    (real, idx) => users.filter(cur => cur.answers[idx] === real).length
  );
  console.log(stats);
  res.json({
    error: false,
    stats,
    passed: users.filter(user => user.answers.every(Boolean)).length,
    total: users.length
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
    answers: (user && user.answers) || [null, null, null, null, null]
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
      answers: [null, null, null, null, null]
    });

  const realCodes = (
    await CodeModel.findOne()
      .lean()
      .exec()
  ).codes;

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
    answers: results
  });
});

app.get("/twitch", (req, res) => {
  res.redirect("https://twitch.tv/kelin2025");
});

app.get("/twitch/subscribe", (req, res) => {
  res.redirect("https://twitch.tv/products/kelin2025");
});

app.get("/youtube", (req, res) => {
  res.redirect("https://youtube.com/kelin2025");
});

app.get("/youtube/sponsorship", (req, res) => {
  res.redirect("https://youtube.com/channel/UCGEDINS5Pz6FTVaZqfU6kMg/join");
});

app.get("/discord", (req, res) => {
  res.redirect("https://discord.gg/ZNxXVs9");
});

app.get("/donate", (req, res) => {
  res.redirect("https://www.donationalerts.com/r/kelin2025");
});

app.get("*", (req, res) => {
  res.send(page);
});

app.listen(process.env.PORT || 8080, () => console.log("Listening!"));
