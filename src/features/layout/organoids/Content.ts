import { route, spec, h } from "forest";

import { $currentRoute, Route } from "@/lib/route";

import { PageRoot } from "@/ui";
import { css } from "@/lib/styled";

css`
  [data-content] {
    overflow: overlay;
  }

  [data-device="phone"] [data-content] {
    padding-bottom: 100px;
  }
`;

export const Content = (routes: Route[]) => {
  const $width = $currentRoute.map((route) => {
    const obj = routes.find((cur) => cur.link === route);
    if (obj) {
      return `${obj.meta.width}px`;
    }
    return "auto";
  });

  h("div", () => {
    spec({
      data: { content: true }
    });
    PageRoot(() => {
      spec({
        styleVar: {
          width: $width
        }
      });

      for (const page of routes) {
        route({
          source: $currentRoute,
          visible: (current) => page.link === current,
          fn: page.view
        });
      }
    });
  });
};
