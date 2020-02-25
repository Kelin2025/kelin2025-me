import { h } from "effector-dom";
import { css } from "~lib/styled";

import { Card } from "~ui";

css`
  [data-email-title] {
    color: #a6a6a6;
    font-size: 16px;
    margin: 0 0 10px;
    font-weight: 400;
  }

  [data-email-value] {
    font-size: 24px;
    font-weight: 600;
  }
`;

export const EmailCard = () => {
  Card(() => {
    h("h2", {
      text: "E-mail",
      data: { emailTitle: true }
    });
    h("div", {
      text: "kelin2025@yandex.ru",
      data: { emailValue: true }
    });
  });
};
