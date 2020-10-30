import { h } from "forest";
import { specCb } from "@/lib/spec";

export const PageSubtitle = text => {
  h("h1", () => {
    specCb({ text, data: { transition: true, pageSubtitle: true } });
  });
};
