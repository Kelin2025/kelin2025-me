import { h } from "effector-dom";
import { css } from "@/lib/styled";
import { Store } from "effector";

css`
  [data-card-title] {
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 20px;
    line-height: 24px;
  }
`;

export const CardTitle = (text: string | Store<string>) => {
  h("h2", { text, data: { cardTitle: true } });
};
