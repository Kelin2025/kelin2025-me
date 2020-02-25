import { css } from "~lib/styled";
import { spec } from "effector-dom";

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
`;

export const withColor = color => {
  spec({ data: { color } });
};
