import { visible } from "@/lib/dom-utils";
import { getIconPath } from "@/lib/steam";
import { h, remap, spec } from "forest";

import { $gamesByTiers } from "@/api/games-tier-list";

import { TierList } from "@/ui";
import { GameModal } from "@/features/games/organoids/GameModal";
import { css } from "@/lib/styled";

css`
  [data-tier-list-tile] {
    cursor: pointer;
    transition: filter 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    will-change: transform;
  }

  [data-tier-list-tile]:hover {
    filter: saturate(1.5) brightness(1.5);
    box-shadow: 0 0 25px #f00;
  }
`;

export const GamesTierList = () => {
  TierList({
    data: $gamesByTiers,
    view: ({ store }) => {
      const gameModal = GameModal(store);
      const icon = store.map((game) => {
        if (!game.steam) {
          return null;
        }
        return getIconPath({ id: game.appid, icon: game.steam.icon });
      });
      h("img", () => {
        visible(store, "steam");
        spec({
          attr: {
            src: icon,
            alt: remap(store, "name"),
            title: remap(store, "name"),
          },
          data: { tierListTile: true },
          style: { borderRadius: "5px" },
          handler: { click: gameModal.open },
        });
      });
    },
  });
};
