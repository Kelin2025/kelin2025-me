import { css } from "~lib/styled";
import { h, spec } from "effector-dom";
import { createStore } from "effector";

import { Aside } from "./Aside";
import { Content } from "./Content";
import { MobileBar } from "./MobileBar";

css`
  [data-device="desktop"] [data-layout] {
    display: grid;
    grid-template-areas: "aside content";
    grid-template-columns: 340px 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }

  [data-layout] [data-aside] {
    grid-area: aside;
  }

  [data-layout] [data-content] {
    grid-area: content;
  }
`;

export const Layout = routes => {
  const $routes = createStore(routes);
  h("section", () => {
    spec({ data: { layout: true } });
    Aside($routes);
    MobileBar($routes);
    Content(routes);
  });
};
