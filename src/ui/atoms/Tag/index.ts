import { h } from "effector-dom";

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
