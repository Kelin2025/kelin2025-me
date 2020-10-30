import { h, spec } from "forest";

export const ButtonsStack = child => {
  h("div", () => {
    spec({ data: { stack: true } });
    child();
  });
};
