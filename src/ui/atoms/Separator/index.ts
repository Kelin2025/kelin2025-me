import { h } from "forest";

import "./index.css";

export const Separator = (type = "light") => {
  h("hr", { data: { separator: type } });
};
