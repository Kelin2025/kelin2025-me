import { h } from "forest";
import { specCb, SpecData } from "@/lib/spec";

export const PageDescription = (specData: SpecData) => {
  h("div", () => {
    specCb(specData, { data: { transition: true, pageDescription: true } });
  });
};
