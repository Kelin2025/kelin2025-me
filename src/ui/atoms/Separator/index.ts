import { h } from "forest";

export const Separator = (type = "light") => {
  h("hr", { data: { separator: type } });
};
