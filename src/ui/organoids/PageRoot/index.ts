import { h, spec } from "forest";

export const PageRoot = children => {
  h("div", () => {
    spec({ data: { pageRoot: true } });
    children();
  });
};
