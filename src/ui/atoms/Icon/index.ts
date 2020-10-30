import { h } from "forest";
import { Store } from "effector";
import { specCb, SpecData, toStore } from "@/lib/spec";

type Data = {
  link: string | Store<string>;
  scale?: number;
};

export const Icon = ({ link, scale }: Data, extra?: SpecData) => {
  h("svg", () => {
    h("use", {
      attr: { href: toStore(link).map(link => `#${link.id}`) }
    });
    specCb(extra, {
      data: { icon: true },
      attr: { viewBox: link.viewBox },
      styleVar: { size: scale ? `${scale * 16}px` : null }
    });
  });
};
