import { h } from "forest";
import { SpecData, specCb } from "@/lib/spec";
import { Store } from "effector";

import "./index.css";

export const Paragraph = (
  text: string | Store<string>,
  specOptions?: SpecData
) => {
  h("p", () => {
    specCb([{ data: { paragraph: true }, text }, specOptions]);
  });
};
