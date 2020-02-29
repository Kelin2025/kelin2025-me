import { h } from "effector-dom";
import { specCb } from "@/lib/spec";

export const Card = child => {
  h("div", () => {
    specCb(child, { data: { card: true } });
  });
};
