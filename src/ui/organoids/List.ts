import { css } from "~lib/styled";
import { h, spec, list } from "effector-dom";
import { is, createStore, Store } from "effector";
import { SpecData, specCb } from "~lib/spec";

css`
  [data-list] {
    margin: 0;
    padding: 0;
    line-height: 2;
  }

  [data-list="square"] li {
    list-style: square inside;
  }

  [data-list="plus"] li,
  [data-list="minus"] li {
    list-style: none;
  }

  [data-list="plus"] li:before,
  [data-list="minus"] li:before {
    padding-right: 10px;
    font-weight: bold;
    vertical-align: 1px;
  }

  [data-list="plus"] li:before {
    content: "+";
  }

  [data-list="minus"] li:before {
    content: "-";
  }
`;

export const List = (
  { type = "square" },
  items: string[] | Store<string[]>,
  extra?: SpecData
) => {
  h("ul", () => {
    spec({ data: { list: type } });
    specCb(extra);
    list(is.store(items) ? items : createStore(items), ({ store }) => {
      h("li", { text: store });
    });
  });
};
