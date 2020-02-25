import { variant, spec, h } from "effector-dom";

import { $currentRoute, Route } from "~lib/route";

import { PageRoot } from "~ui";
import { css } from "~lib/styled";

css`
  [data-content] {
    overflow: overlay;
  }
`;

export const Content = (routes: Route[]) => {
  const $width = $currentRoute.map(route => {
    const obj = routes.find(cur => cur.link === route);
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
      variant(
        $currentRoute,
        routes.reduce((res, cur) => {
          // NOTE: We need to wrap in div
          // Otherwise it will randomly render elements from other pages
          // Probably because variant does not support 2+ roots yet
          res[cur.link] = () => {
            h("div", () => {
              cur.view();
            });
          };
          return res;
        }, {})
      );
    });
  });
};
