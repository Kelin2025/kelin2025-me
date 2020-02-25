import { css } from "~lib/styled";
import { h, list, spec, remap } from "effector-dom";

import {
  $searchInput,
  $filteredGames,
  searchInputChanged
} from "../logic/search";

import clock from "~ui/assets/icons/clock.svg";
import { GameData } from "../moleculas/GameData";
import { GameModal } from "./GameModal";
import { Card, Grid, Icon, Input, Button, ColumnGrid } from "~ui";

css`
  [data-game] {
    display: grid;
    align-items: center;
    grid-template-columns: min-content 1fr max-content;
  }
`;

export const Games = () => {
  ColumnGrid(() => {
    Grid({ cols: "1fr max-content" }, () => {
      Input(
        { value: $searchInput, change: searchInputChanged },
        {
          attr: { placeholder: "Поиск по играм..." }
        }
      );
    });
    ColumnGrid(() => {
      list($filteredGames, ({ store }) => {
        const gameModal = GameModal(store);
        Card(() => {
          spec({ data: { game: true } });
          h("img", {
            data: { gameIcon: true },
            attr: { src: remap(store, "image") }
          });
          h("div", () => {
            GameData(store);
          });
          Grid({ flow: "column", align: "center" }, () => {
            spec({ data: { gameControls: true } });
            Grid({ flow: "column", gap: 8, align: "center" }, () => {
              Icon({ link: clock, scale: 1.5 });
              h("span", { text: store.map(game => `${game.hours}ч`) });
            });
            Button({
              type: "primary",
              text: "Подробнее",
              click: gameModal.open
            });
          });
        });
      });
    });
  });
};
