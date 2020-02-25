import { css } from "~lib/styled";
import { createStore } from "effector";
import { h, list, remap, spec } from "effector-dom";

import avatar from "~ui/assets/icons/avatar.png";
import { Route } from "~lib/route";
import { RouteLink, Grid } from "~ui";

css`
  [data-aside] {
    background: var(--color-card-bg);
    padding: 40px 15px;
    border-right: 8px solid #6129ff;
  }

  [data-aside-header] {
    margin-left: 30px;
    margin-bottom: 40px;
  }

  [data-aside-header] img {
    border-radius: 50%;
  }

  [data-aside-header] h3 {
    font-size: 30px;
    margin: 0;
  }

  [data-aside-link] {
    color: #a6a6a6;
    display: block;
    font-size: 20px;
    padding: 15px;
    border-radius: 5px;
    transition: color 0.2s ease-out, background 0.2s ease-out;
  }

  [data-aside-link][data-active] {
    color: #fff;
    background: #232628;
  }
`;

export const Aside = (routes: Route[]) => {
  const $routes = createStore(routes);
  h("aside", () => {
    spec({ data: { aside: true } });
    Grid({ cols: "48px max-content", align: "center" }, () => {
      spec({ data: { asideHeader: true } });
      h("img", {
        attr: {
          src: avatar
        }
      });
      h("h3", { text: "Kelin2025" });
    });
    list($routes, ({ store }) => {
      RouteLink(
        {
          icon: store.map(link => link.meta.icon),
          text: remap(store, "title"),
          href: remap(store, "link")
        },
        () => {
          spec({ data: { asideLink: true } });
        }
      );
    });
  });
};
