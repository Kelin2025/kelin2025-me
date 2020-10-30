import { h, spec } from "forest";

export const Label = (text: string, child: Function) => {
  h("label", () => {
    spec({ data: { label: true } });
    h("div", { text });
    child();
  });
};
