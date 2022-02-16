import { h, spec } from "forest";
import "./index.css";

export const ButtonsStack = child => {
  h("div", () => {
    spec({ data: { stack: true } });
    child();
  });
};
