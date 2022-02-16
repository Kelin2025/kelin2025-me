import { spec, h } from "forest";

import "./index.css";

export const withColor = color => {
  spec({ data: { color } });
};

export const TextBlock = child => {
  h("div", () => {
    spec({ data: { text: true } });
    child();
  });
};
