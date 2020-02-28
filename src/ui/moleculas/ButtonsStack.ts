import { h, spec } from "effector-dom";
import { css } from "@/lib/styled";

css`
  [data-stack] [data-button] {
    margin: 0;
  }

  [data-stack] [data-button]:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  [data-stack] [data-button]:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: -1px 0 0 0 rgba(0, 0, 0, 0.5) inset;
  }
`;

export const ButtonsStack = child => {
  h("div", () => {
    spec({ data: { stack: true } });
    child();
  });
};
