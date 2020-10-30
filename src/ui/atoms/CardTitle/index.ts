import { h } from "forest";
import { Store } from "effector";

export const CardTitle = (text: string | Store<string>) => {
  h("h2", { text, data: { cardTitle: true } });
};
