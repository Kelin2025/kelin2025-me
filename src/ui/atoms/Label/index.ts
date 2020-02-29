import { h, spec } from "effector-dom";

export const Label = (text: string, child: Function) => {
  h("label", () => {
    spec({ data: { label: true } });
    h("div", { text });
    child();
  });
};
