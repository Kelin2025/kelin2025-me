import { h, spec } from "forest";

import { $gamesByTiers } from "@/api/games-tier-list";

import { TierList } from "@/ui";
import { getIconPath } from "@/lib/steam";

export const GamesTierList = () => {
  TierList({
    data: $gamesByTiers,
    view: ({ store }) => {
      const icon = store.map(
        (game) =>
          game.steam && getIconPath({ id: game.appid, icon: game.steam.icon })
      );
      spec({
        visible: store.map((game) => !!game.steam),
      });
      h("img", {
        attr: { src: icon },
        style: { borderRadius: "5px" },
      });
    },
  });
};
