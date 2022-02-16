import { h } from "forest";
import { specCb } from "@/lib/spec";

import "./index.css";

export const PageSubtitle = text => {
  h("h1", () => {
    specCb({ text, data: { transition: true, pageSubtitle: true } });
  });
};
