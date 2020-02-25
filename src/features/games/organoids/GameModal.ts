import { copyText } from "~lib/copy";
import { textToHash } from "~lib/search-hash";
import { onEventData } from "~lib/dom-utils";
import { routeChanged } from "~lib/route";
import { h, remap, spec, list } from "effector-dom";
import { Store, forward, sample, guard } from "effector";

import { Game } from "~api/games";
import { gameModalTriggered } from "../logic/search";

import clock from "~ui/assets/icons/clock.svg";
import { GameData } from "../moleculas/GameData";
import {
  Modal,
  Separator,
  List,
  Grid,
  Icon,
  Button,
  ColumnGrid,
  Text
} from "~ui";

export const GameModal = (game: Store<Game>) => {
  const paragraphs = game.map(game =>
    typeof game.description === "string"
      ? game.description.split("\n")
      : game.description
  );
  const modal = Modal({
    title: () => {
      Grid(
        { cols: "1fr max-content", align: "center", justify: "space-between" },
        () => {
          h("div", () => {
            GameData(game);
          });
          Grid({ flow: "column", gap: 8, align: "center" }, () => {
            Icon({ link: clock, scale: 1.5 });
            h("span", { text: game.map(game => `${game.hours}ч`) });
          });
        }
      );
    },
    child: () => {
      ColumnGrid(() => {
        Text(() => {
          list(paragraphs, ({ store }) => {
            h("p", { text: store });
          });
        });
        h("h4", {
          text: "Плюсы",
          style: { margin: "20px 0 0", fontSize: "24px", fontWeight: 400 }
        });
        List({ type: "plus" }, remap(game, "pros"), () => {
          spec({ data: { color: "green" } });
        });
        h("h4", {
          text: "Минусы",
          style: { margin: "20px 0 0", fontSize: "24px", fontWeight: 400 }
        });
        List({ type: "minus" }, remap(game, "cons"), () => {
          spec({ data: { color: "red" } });
        });
      });
    },
    controls: () => {
      Button(
        {
          type: "primary",
          text: "Копировать ссылку",
          click: onEventData<MouseEvent>(
            game.map(
              game => `https://kelin2025.me/games#${textToHash(game.title)}`
            ),
            copyText
          )
        },
        { data: { full: true, size: "form" } }
      );
    }
  });

  forward({
    from: sample(remap(game, "title"), modal.open),
    to: routeChanged.prepend(title => `/games#${textToHash(title)}`)
  });

  forward({
    from: sample(remap(game, "title"), modal.close),
    to: routeChanged.prepend(title => `/games`)
  });

  guard({
    source: sample(
      remap(game, "title"),
      gameModalTriggered,
      (current, opened) => ({ current, opened })
    ),
    filter: ({ current, opened }) =>
      current.toLocaleLowerCase() === opened.toLocaleLowerCase(),
    target: modal.open
  });

  return modal;
};
