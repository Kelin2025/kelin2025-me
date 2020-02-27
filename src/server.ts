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

app.get("*", (req, res) => {
  res.send(page);
});

app.post("/api/results", async (req, res) => {
  console.log(req.body);
  const user = await RecordModel.findOne({ uid: req.body.uid || "" })
    .lean()
    .exec();
  console.log(user);

  res.json({
    error: false,
    answers: (user && user.answers) || [false, false, false, false, false]
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
      answers: [false, false, false, false, false]
    });

  const results = zip(
    (
      await CodeModel.findOne()
        .lean()
        .exec()
    ).codes,
    req.body.answers,
    user.answers
  ).map(([real, provided, wasAnswered]) => wasAnswered || real === provided);

  user.answers = results;
  user.contact = req.body.contact;
  user.save();

  res.status(200).json({
    error: false,
    answers: results
  });
});

app.listen(process.env.PORT || 8080, () => console.log("Listening!"));
