import { h, spec } from "forest";

import "./index.css";

export const Label = (text: string, child: Function) => {
  h("label", () => {
    spec({ data: { label: true } });
    h("div", { text });
    child();
  });
};
