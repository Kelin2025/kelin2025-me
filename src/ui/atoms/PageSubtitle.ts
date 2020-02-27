import { h } from "effector-dom";
import { specCb } from "~lib/spec";
import { css } from "~lib/styled";

css`
  [data-page-subtitle] {
    margin: 0;
    font-size: 36px;
    font-weight: 500;
  }

  [data-device="phone"] [data-page-subtitle] {
    font-size: 24px;
  }
`;

export const PageSubtitle = text => {
  h("h1", () => {
    specCb({ text, data: { transition: true, pageSubtitle: true } });
  });
};
