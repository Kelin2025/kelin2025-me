import { h } from "effector-dom";
import { css } from "@/lib/styled";

const colors = {
  red: "#FF4242",
  orange: "#FFA842",
  green: "#42FFBB"
};

const bgColors = {
  red: "#470F0F",
  orange: "#5B3911",
  green: "#124936"
};

css`
  [data-tag] {
    /* background: var(--bgColor); */
    border-radius: 10px;
    /* color: var(--color); */
    color: #a6a6a6;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const Tag = (color, text) => {
  h("span", {
    text,
    data: { tag: true },
    styleVar: {
      color: colors[color],
      bgColor: bgColors[color]
    }
  });
};
