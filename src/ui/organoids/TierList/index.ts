import { h, spec, list } from "forest";
import { combine, Store } from "effector";

import { Grid } from "../../atoms/Grid";

type Props<T> = {
  data: Store<{ [key: string]: T[] }>;
  view: (data: { store: Store<T> }) => void;
};

const colors = {
  S: { background: "rgb(255, 127, 127)", text: "#000000" },
  A: { background: "rgb(255, 191, 127)", text: "#000000" },
  B: { background: "rgb(255, 223, 127)", text: "#000000" },
  C: { background: "rgb(255, 223, 127)", text: "#000000" },
  D: { background: "rgb(255, 255, 127)", text: "#000000" },
  E: { background: "rgb(255, 127, 127)", text: "#000000" },
  Meme: { background: "rgb(255, 127, 127)", text: "#000000" },
};

export const TierRow = ({ tier, items, view }) => {
  h("tr", () => {
    spec({ data: { tierListRow: true } });
    h("td", {
      text: tier,
      data: { tierListTier: tier },
      styleVar: {
        textColor: tier.map((tier) => colors[tier].text),
        background: tier.map((tier) => colors[tier].background),
      },
    });
    h("td", () => {
      spec({ data: { tierListItems: true } });
      Grid({ flow: "column" }, () => {
        list(items, ({ store }) => {
          view({ store: store });
        });
      });
    });
  });
};

export const TierList = <T>({ data, view }: Props<T>) => {
  const tiers = data.map((data) => Object.keys(data));
  h("table", () => {
    spec({ data: { tierList: true } });
    list(tiers, ({ store }) => {
      TierRow({
        tier: store,
        items: combine(store, data, (tier, data) => data[tier]),
        view,
      });
    });
  });
};
