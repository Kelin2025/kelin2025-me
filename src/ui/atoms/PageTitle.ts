import { h } from "effector-dom";
import { css } from "@/lib/styled";
import { specCb } from "@/lib/spec";

css`
  [data-page-title] {
    margin: 0;
    font-size: 48px;
    font-weight: 500;
  }

  [data-device="phone"] [data-page-title] {
    font-size: 30px;
  }
`;

export const PageTitle = text => {
  h("h1", () => {
    specCb({ text, data: { transition: true, pageTitle: true } });
  });
};
