import { h, spec } from "forest";

import "./index.css";

export const PageRoot = children => {
  h("div", () => {
    spec({ data: { pageRoot: true } });
    children();
  });
};
