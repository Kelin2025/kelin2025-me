import { h } from "forest";
import { pageTransition } from "@/ui/logic/transition";

export const TransitionBlock = child => {
  h("div", () => {
    pageTransition.use();
    child();
  });
};
