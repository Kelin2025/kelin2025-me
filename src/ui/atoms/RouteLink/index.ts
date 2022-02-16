import { Store, combine } from "effector";
import { specCb, SpecData } from "@/lib/spec";
import { h, spec, handler } from "forest";

import { $currentRoute, routeChanged } from "@/lib/route";

import { Icon } from "../Icon";
import { eventWithData } from "@/lib/dom-utils";

type LinkData = {
  icon: string | Store<string>;
  text: string | Store<string>;
  href: Store<string>;
};

export const RouteLink = (
  { icon, text, href }: LinkData,
  specData?: SpecData
) => {
  h("a", () => {
    spec({
      attr: { href },
      data: {
        routeLink: true,
        active: combine(href, $currentRoute, (href, cur) => cur === href)
      }
    });
    Icon({ link: icon });
    h("span", { text });
    handler({ prevent: true }, { click: eventWithData(href, routeChanged) });
    specCb(specData);
  });
};
