import { css } from "@/lib/styled";
import { spec } from "effector-dom";
import { device } from "@/ui/logic/screen";

import { NameFilter } from "../moleculas/NameFilter";
import { TagsFilter } from "../moleculas/TagsFilter";
import { FilteredGames } from "./FilteredGames";
import { Grid, ColumnGrid, GridArea } from "@/ui";

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
  device({
    desktop: () => {
      Grid({}, () => {
        spec({
          styleVar: {
            cols: "1fr 450px",
            rows: "max-content 1fr",
            areas: '"search filter" "games filter"'
          }
        });
        GridArea("search", () => {
          NameFilter();
        });
        GridArea("filter", () => {
          TagsFilter();
        });
        GridArea("games", () => {
          FilteredGames();
        });
      });
    },
    phone: () => {
      ColumnGrid(() => {
        NameFilter();
        FilteredGames();
      });
    }
  });
};
