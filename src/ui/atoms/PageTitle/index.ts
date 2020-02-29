import { h } from "effector-dom";
import { specCb } from "@/lib/spec";

export const PageTitle = text => {
  h("h1", () => {
    specCb({ text, data: { transition: true, pageTitle: true } });
  });
};
