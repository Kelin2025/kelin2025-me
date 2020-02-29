import { spec, h } from "effector-dom";

export const withColor = color => {
  spec({ data: { color } });
};

export const TextBlock = child => {
  h("div", () => {
    spec({ data: { text: true } });
    child();
  });
};
