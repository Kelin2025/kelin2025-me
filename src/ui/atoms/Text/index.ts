import { spec, h } from "forest";

export const withColor = color => {
  spec({ data: { color } });
};

export const TextBlock = child => {
  h("div", () => {
    spec({ data: { text: true } });
    child();
  });
};
