import { css } from "@/lib/styled";
import { Store } from "effector";
import { h, list, remap, spec } from "forest";

import avatar from "@/ui/assets/icons/avatar.png";
import { Route } from "@/lib/route";
import { RouteLink, Grid } from "@/ui";
import { onlyOn } from "@/ui/logic/screen";

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
    height: 44px;
  }

  [data-aside-header] h3 {
    font-size: 30px;
    margin: 0;
  }

  [data-aside-link] {
    color: var(--color-link-disabled);
    font-size: 30px;
    display: block;
    font-size: 20px;
    padding: 15px;
    border-radius: 5px;
    transition: color 0.2s ease-out, background 0.2s ease-out;
  }

  [data-aside-link]&[data-active] {
    color: #ffffff;
  }

  [data-aside-link] [data-icon] {
    --size: 32px;
    margin-right: 20px;
  }

  [data-aside-link][data-active] {
    color: #fff;
    background: #232628;
  }

  [data-aside-link][data-highlight] {
    color: #ffc800;
  }

  [data-aside-link][data-highlight][data-active] {
    background: #715709;
  }

  /* [data-device="phone"] [data-aside] {
    border-radius: 10px 10px 0 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    border: none;
    margin: 0;
    transform: translateY(100%);
  } */
`;

export const Aside = (routes: Store<Route[]>) => {
  h("aside", () => {
    onlyOn("desktop");
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
    list(routes, ({ store }) => {
      RouteLink(
        {
          icon: store.map(link => link.meta.icon),
          text: remap(store, "title"),
          href: remap(store, "link")
        },
        () => {
          spec({
            data: { highlight: store.map(link => link.link === "/giveaway") }
          });
          spec({ data: { asideLink: true } });
        }
      );
    });
  });
};
