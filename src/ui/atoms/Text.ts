import { css } from "~lib/styled";
import { spec, h } from "effector-dom";

css`
  [data-color] {
    color: var(--color);
  }

  [data-color="green"] {
    --color: var(--color-green);
  }

  [data-color="red"] {
    --color: var(--color-red);
  }

  [data-color="donate"] {
    --color: var(--color-donate);
  }

  [data-color="primary"] {
    --color: var(--color-primary);
  }

  [data-color="discord"] {
    --color: var(--color-discord);
  }

  [data-color="youtube"] {
    --color: var(--color-youtube);
  }

  [data-color="twitch"] {
    --color: var(--color-twitch);
  }

  [data-text] {
    text-align: justify;
  }

  [data-text] p:first-child {
    margin-top: 0;
  }

  [data-text] p:last-child {
    margin-bottom: 0;
  }
`;

export const withColor = color => {
  spec({ data: { color } });
};

export const TextBlock = child => {
  h("div", () => {
    spec({ data: { text: true } });
    child();
  });
};
