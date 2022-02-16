import { h } from "forest";
import { specCb } from "@/lib/spec";
import "./index.css";

export const Card = child => {
  h("div", () => {
    specCb(child, { data: { card: true } });
  });
};
