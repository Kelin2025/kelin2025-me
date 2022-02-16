import { css } from "@/lib/styled";
import { Store } from "effector";
import { Route } from "@/lib/route";
import { onlyOn } from "@/ui/logic/screen";
import { h, spec, list } from "forest";

import { RouteLink } from "@/ui";

css`
  [data-mobile-bar] {
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0;
    right: 0;
    background: #232628;
    box-shadow: -5px 0 5px #111;
  }

  [data-mobile-bar] [data-route-link] {
    background: rgba(255, 255, 255, 0);
    z-index: 2;
    flex: 1;
    color: #fff;
    text-align: center;
    padding: 20px 10px;
    transition: background 0.2s ease-out, color 0.2s ease-out;
  }

  [data-mobile-bar] [data-route-link]:hover,
  [data-mobile-bar] [data-route-link]:active {
    background: #577bf9;
    color: #fff;
  }

  [data-mobile-bar] [data-route-link]:hover svg,
  [data-mobile-bar] [data-route-link]:active svg {
    transform: scale(0.75);
  }

  [data-mobile-bar] [data-route-link][data-active] {
    background: #181a1b;
    color: #577bf9;
  }

  [data-mobile-bar] [data-route-link][data-active] svg {
    transform: scale(1.25);
  }

  [data-mobile-bar] [data-route-link] svg {
    display: block;
    margin: 0 auto;
    width: 32px;
    height: 32px;
    transition: transform 0.2s ease-out;
  }

  /* [data-mobile-lava] {
    background: rgba(255, 255, 255, 0.1);
    position: absolute;
    width: 33.3333%;
    height: 100%;
    transition: left 0.2s ease-out;
  } */
`;

export const MobileBar = (routes: Store<Route[]>) => {
  // const linkClicked = createEvent<{
  //   index: number;
  //   count: number;
  //   evt: MouseEvent;
  // }>();
  h("div", () => {
    onlyOn("phone");
    spec({ data: { mobileBar: true }, style: { zIndex: "100" } });
    // h("div", () => {
    //   spec({ data: { mobileLava: true } });
    //   node(el => {
    //     linkClicked.watch(({ index, count, evt }) => {
    //       el.style.left = `${(index / count) * 100}%`;
    //     });
    //   });
    // });
    list(routes, ({ store }) => {
      RouteLink(
        {
          icon: store.map((route) => route.meta.icon),
          text: null,
          href: store.map((route) => route.link)
        }
        // () => {
        //   handler({
        //     click: onEventData(
        //       combine({ index, routes }),
        //       linkClicked,
        //       ({ index, routes }, evt) => ({ index, count: routes.length, evt })
        //     )
        //   });
        // }
      );
    });
  });
};
