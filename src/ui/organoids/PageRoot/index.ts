import { h, spec } from "effector-dom";

export const PageRoot = children => {
  h("div", () => {
    spec({ data: { pageRoot: true } });
    children();
  });
};
