import { h } from "effector-dom";
import { css } from "~lib/styled";
import { Store } from "effector";
import { specCb, SpecData } from "~lib/spec";

css`
  [data-icon] {
    --size: 16px;
    display: inline-block;
    height: var(--size);
    width: var(--size);
    line-height: 1em;
    fill: currentColor;
    vertical-align: middle;
    transition: color 0.2s ease-out;
  }
`;

type Data = {
  link: string | Store<string>;
  scale?: number;
};

export const Icon = ({ link, scale }: Data, extra?: SpecData) => {
  h("svg", () => {
    h("use", {
      attr: { href: link }
    });
    specCb(extra, {
      data: { icon: true },
      styleVar: { size: scale ? `${scale * 16}px` : null }
    });
  });
};
