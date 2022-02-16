import { h, spec, list } from "forest";
import { is, createStore, Store } from "effector";
import { SpecData, specCb } from "@/lib/spec";

import "./index.css";

export const List = (
  { type = "square" },
  items: string[] | Store<string[]>,
  extra?: SpecData
) => {
  h("ul", () => {
    spec({ data: { list: type } });
    specCb(extra);
    list(is.store(items) ? items : createStore(items), ({ store }) => {
      h("li", { text: store });
    });
  });
};
