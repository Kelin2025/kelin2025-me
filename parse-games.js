const fs = require("fs");

const content = fs.readFileSync("./games.txt", "utf-8");

const games = content.split("\r\n==========\r\n").reduce((res, gameContent) => {
  const [appid, name, tier, video, ...review] = gameContent.split("\r\n");
  const game = {
    appid,
    name,
    tier,
    review: review.join("\n"),
    video: video || null,
    steam: {},
  };
  return [...res, game];
}, []);

fs.writeFileSync("./games.json", JSON.stringify(games));
