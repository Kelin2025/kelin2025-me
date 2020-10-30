import { h, list } from "forest";
import { createStore, combine } from "effector";
import { Grid } from "@/ui";
import { css } from "@/lib/styled";
import { $gamesTiers, $gamesByTiers } from "@/api/games-tier-list";

const $tiers = createStore(["S", "A", "B", "C", "D", "E", "Meme"]);

const $games = createStore([
  "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
  "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
  "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
]);

const colors = {
  S: { background: "rgb(255, 127, 127)", text: "#000000" },
  A: { background: "rgb(255, 191, 127)", text: "#000000" },
  B: { background: "rgb(255, 223, 127)", text: "#000000" },
  C: { background: "rgb(255, 223, 127)", text: "#000000" },
  D: { background: "rgb(255, 255, 127)", text: "#000000" },
  E: { background: "rgb(255, 127, 127)", text: "#000000" },
  Meme: { background: "rgb(255, 127, 127)", text: "#000000" },
};

const style = Object.entries(colors).reduce(
  (res, [tier, colors]) =>
    `${res}
  
    [data-tier-title=${tier}] {
      background: ${colors.background};
      color: ${colors.text};
    }
  `,
  ``
);

console.log(style);

css`
  [data-tier-title] {
    width: 100px;
    min-height: 80px;
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
  }

  ${style}
`;

export const GamesTierList = () => {
  h("table", () => {
    list($gamesTiers, ({ store }) => {
      h("tr", () => {
        h("td", { text: store, data: { tierTitle: store } });
        h("td", () => {
          Grid({ flow: "column" }, () => {
            list(
              combine(store, $gamesByTiers, (tier, games) => games[tier]),
              ({ store }) => {
                h("img", { src: store.map((game) => game.image) });
              }
            );
          });
        });
      });
    });
  });
};
