import { h } from "effector-dom";
import { css } from "@/lib/styled";
import { specCb } from "@/lib/spec";

css`
  [data-card] {
    border-radius: 10px;
    background: var(--color-card-bg);
    padding: 20px;
    transition: background 0.2s ease-out;
  }
`;

export const Card = child => {
  h("div", () => {
    specCb(child, { data: { card: true } });
  });
};
