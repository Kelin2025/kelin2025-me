import { h, spec } from "effector-dom";
import { css } from "~lib/styled";

css`
  [data-label] {
    display: grid;
    grid-gap: 10px;
  }
`;

export const Label = (text: string, child: Function) => {
  h("label", () => {
    spec({ data: { label: true } });
    h("div", { text });
    child();
  });
};
