import { css } from "~lib/styled";
import { Store, combine } from "effector";
import { specCb, SpecData } from "~lib/spec";
import { h, spec, handler } from "effector-dom";

import { $currentRoute, routeChanged } from "~lib/route";

import { Icon } from "./Icon";
import { onEventData } from "~lib/dom-utils";

type LinkData = {
  icon: string | Store<string>;
  text: string | Store<string>;
  href: string | Store<string>;
};

css`
  [data-route-link] {
    color: var(--color-link-disabled);
    font-size: 30px;
  }

  [data-route-link]&[data-active] {
    color: #ffffff;
  }

  [data-route-link] [data-icon] {
    --size: 32px;
    margin-right: 20px;
  }
`;

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
    handler({ prevent: true }, { click: onEventData(href, routeChanged) });
    specCb(specData);
  });
};
