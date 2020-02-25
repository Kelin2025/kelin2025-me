import { h } from "effector-dom";
import { css } from "~lib/styled";

css`
  [data-separator] {
    border: none;
    height: 1px;
    margin: 0;
  }

  [data-separator="light"] {
    background: rgba(255, 255, 255, 0.1);
  }

  [data-separator="dark"] {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Separator = (type = "light") => {
  h("hr", { data: { separator: type } });
};
