import { h } from "forest";
import { specCb, SpecData } from "@/lib/spec";

import "./index.css";

export const PageDescription = (specData: SpecData) => {
  h("div", () => {
    specCb(specData, { data: { transition: true, pageDescription: true } });
  });
};
