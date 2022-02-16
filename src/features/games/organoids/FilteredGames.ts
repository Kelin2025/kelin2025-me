import { list, spec, h } from "forest";

import { $filteredGames } from "../logic/search";

import clock from "@/ui/assets/icons/clock.svg";
import { GameData } from "../moleculas/GameData";
import { GameModal } from "./GameModal";
import { ColumnGrid, Card, Grid, Icon, Button } from "@/ui";

export const FilteredGames = () => {
  ColumnGrid(() => {
    list($filteredGames, ({ store }) => {
      const gameModal = GameModal(store);
      Card(() => {
        spec({ data: { game: true } });
        h("div", () => {
          GameData(store);
        });
        Grid({ flow: "column", align: "center" }, () => {
          spec({ data: { gameControls: true } });
          Grid({ flow: "column", gap: 8, align: "center" }, () => {
            spec({ data: { gameHours: true } });
            Icon({ link: clock, scale: 1.5 });
            h("span", { text: store.map(game => `${game.hours}ч`) });
          });
          Button({
            text: "Подробнее",
            data: { type: "primary" },
            handler: {
              click: gameModal.open
            }
          });
        });
      });
      console.timeEnd("start");
    });
  });
};
