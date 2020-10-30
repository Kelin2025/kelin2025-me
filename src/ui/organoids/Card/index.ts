import { h } from "forest";
import { specCb } from "@/lib/spec";

export const Card = child => {
  h("div", () => {
    specCb(child, { data: { card: true } });
  });
};
