import { css } from "~lib/styled";
import { h, spec } from "effector-dom";

css`
  [data-page-root] {
    padding: 40px;
    max-width: var(--width);
  }
`;

export const PageRoot = children => {
  h("div", () => {
    spec({ data: { pageRoot: true } });
    children();
  });
};
