import { css } from "~lib/styled";
import { Store } from "effector";
import { onEventData } from "~lib/dom-utils";
import { remap, h, spec, list, handler } from "effector-dom";

import { Game } from "~api/games";
import { searchInputChanged } from "../logic/search";

css`
  [data-game-title] {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
  }

  [data-game-tags] {
    color: #a6a6a6;
    font-size: 14px;
  }

  [data-game-tags] a {
    color: #a6a6a6;
  }
`;

export const GameData = (store: Store<Game>) => {
  const tags = remap(store, "tags").map(tags =>
    tags.filter(cur => cur.type !== "hidden")
  );
  h("h2", { text: remap(store, "title"), data: { gameTitle: true } });
  h("div", () => {
    spec({ data: { gameTags: true } });
    h("b", () => {
      h("a", {
        attr: { href: "#!" },
        text: store.map(game => `${game.rating}`)
      });
      h("span", {
        text: " - "
      });
    });
    list(tags, ({ store, index }) => {
      const click = onEventData<MouseEvent>(
        store.map(tag => tag.value),
        searchInputChanged
      );
      h("a", () => {
        spec({
          attr: { href: "#!" },
          text: remap(store, "value")
        });
        handler({ prevent: true }, { click });
      });
      h("span", {
        text: ", ",
        visible: tags.map(tags => tags.length !== index + 1)
      });
    });
  });
};
