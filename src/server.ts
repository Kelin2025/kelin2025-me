import express from "express";
import * as fs from "fs";
import * as path from "path";
import template from "lodash.template";

const app = express();

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

app.use("/public", express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.send(page);
});

app.listen(process.env.PORT || 8080);
