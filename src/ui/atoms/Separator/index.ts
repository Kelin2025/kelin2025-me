import { h } from "effector-dom";

export const Separator = (type = "light") => {
  h("hr", { data: { separator: type } });
};
