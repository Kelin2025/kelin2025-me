import { h } from "forest";
import { Store } from "effector";
import { specCb, SpecData, toStore } from "@/lib/spec";

import "./index.css";

type Data = {
  link: string | Store<string>;
  scale?: number;
};

export const Icon = ({ link, scale }: Data, extra?: SpecData) => {
  h("svg", () => {
    h("use", {
      attr: {
        href: toStore(link)
          .map(link => link.split("/"))
          .map(link => link[link.length - 1])
          .map(link => link.replace(".svg", ""))
          .map(link => `#icon-${link}`)
      }
    });
    specCb(extra, {
      data: { icon: true },
      // attr: { viewBox: link.viewBox },
      styleVar: { size: scale ? `${scale * 16}px` : null }
    });
  });
};
