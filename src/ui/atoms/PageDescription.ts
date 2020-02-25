import { h } from "effector-dom";
import { css } from "~lib/styled";
import { specCb, SpecData } from "~lib/spec";

css`
  [data-page-description] {
    font-size: 20px;
    margin: 20px 0 40px;
  }

  [data-page-description] > p:first-child {
    margin-top: 0;
  }

  [data-page-description] > p:last-child {
    margin-bottom: 0;
  }
`;

export const PageDescription = (specData: SpecData) => {
  h("div", () => {
    specCb(specData, { data: { transition: true, pageDescription: true } });
  });
};
