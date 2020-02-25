import { css } from "~lib/styled";
import { h, spec } from "effector-dom";

import { Aside } from "./Aside";
import { Content } from "./Content";

css`
  [data-layout] {
    display: grid;
    grid-template-columns: 340px 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }
`;

export const Layout = routes => {
  h("section", () => {
    spec({ data: { layout: true } });
    Aside(routes);
    Content(routes);
  });
};
