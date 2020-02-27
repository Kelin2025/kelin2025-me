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
    grid-gap: 10px;
    grid-template-columns: 1fr max-content;
  }

  @media only screen and (max-width: 640px) {
    [data-game] {
      grid-template-columns: 1fr;
    }

    [data-game-hours] {
      display: none;
    }
  }
`;

export const Games = () => {
  ColumnGrid(() => {
    Input(
      { value: $searchInput, change: searchInputChanged },
      {
        attr: { placeholder: "Поиск по играм..." }
      }
    );
    ColumnGrid(() => {
      list($filteredGames, ({ store }) => {
        const gameModal = GameModal(store);
        Card(() => {
          spec({ data: { game: true } });
          // h("img", {
          //   data: { gameIcon: true },
          //   attr: { src: remap(store, "image") }
          // });
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
