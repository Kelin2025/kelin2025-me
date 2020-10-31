import { copyText } from "@/lib/copy";
import { textToHash } from "@/lib/hash-parser";
import { getGamePath } from "@/lib/steam";
import { routeChanged } from "@/lib/route";
import { eventWithData, navigate } from "@/lib/dom-utils";
import { h, remap, list, variant, route } from "forest";
import { Store, forward, sample, guard } from "effector";

import { Game } from "@/api/games-tier-list";
import { gameModalTriggered } from "../logic/search";

import { Modal, Grid, Button, ColumnGrid, TextBlock, Paragraph } from "@/ui";

export const GameModal = (game: Store<Game>) => {
  const paragraphs = game.map((game) => {
    if (!game.review) {
      return null;
    }
    return game.review.split("\n");
  });

  const modal = Modal({
    title: () => {
      h("div", () => {
        h("h2", { text: remap(game, "name"), data: { gameTitle: true } });
      });
    },
    child: () => {
      ColumnGrid(() => {
        TextBlock(() => {
          route({
            source: game,
            visible: (game) => game.steam && !!game.steam.about,
            fn: () => {
              h("h4", {
                text: "Описание из Steam",
                style: { margin: "0 0 10px" },
              });
              Paragraph(game.map((game) => game.steam.about));
            },
          });
          route({
            source: paragraphs,
            visible: (p) => !!p,
            fn: () => {
              h("h4", { text: "Мое мнение" });
              list(paragraphs, ({ store }) => {
                Paragraph(store);
              });
            },
          });
        });
      });
    },
    controls: ({ close }) => {
      Grid({ gap: 8, justify: "center", flow: "column" }, () => {
        Button({
          text: "Перейти в Steam",
          data: { size: "form", type: "primary" },
          handler: {
            click: navigate<MouseEvent>(
              game.map((game) => getGamePath({ id: game.appid }))
            ),
          },
        });
        Button({
          data: { size: "form", type: "primary" },
          text: "Копировать ссылку",
          handler: {
            click: eventWithData<MouseEvent>(
              game.map((game) => getGamePath({ id: game.appid })),
              copyText
            ),
          },
        });
        Button({
          data: { size: "form" },
          text: "Закрыть",
          handler: { click: close },
        });
      });
    },
  });

  // forward({
  //   from: sample(remap(game, "name"), modal.open),
  //   to: routeChanged.prepend((title) => `/games#${textToHash(title)}`),
  // });

  // forward({
  //   from: sample(remap(game, "name"), modal.close),
  //   to: routeChanged.prepend((title) => `/games`),
  // });

  // guard({
  //   source: sample(
  //     remap(game, "name"),
  //     gameModalTriggered,
  //     (current, opened) => ({ current, opened })
  //   ),
  //   filter: ({ current, opened }) =>
  //     current.toLocaleLowerCase() === opened.toLocaleLowerCase(),
  //   target: modal.open,
  // });

  return modal;
};
