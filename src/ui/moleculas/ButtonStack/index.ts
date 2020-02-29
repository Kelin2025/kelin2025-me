import { h, spec } from "effector-dom";

export const ButtonsStack = child => {
  h("div", () => {
    spec({ data: { stack: true } });
    child();
  });
};
