import { h } from "effector-dom";
import { Store } from "effector";

export const CardTitle = (text: string | Store<string>) => {
  h("h2", { text, data: { cardTitle: true } });
};
