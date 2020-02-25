import nanoid from "nanoid/generate";
import { spec } from "effector-dom";

const generate = (selector, tokens, ...args) =>
  `${selector} { ${tokens.reduce((res, cur, idx) => {
    res += `${cur}${args[idx] || ""}`;
    return res;
  }, "")} } `;

const createSubSelector = (query, rootSelector) =>
  query.replace(new RegExp("&", "g"), rootSelector);

export const style = (tokens, ...args) => {
  const style = document.createElement("style");
  const data = nanoid("abcdefghijklmnopqrstuvwxyz0123456789", 20);
  const rootSelector = `[data-${data}]`;
  style.innerHTML = generate(rootSelector, tokens, ...args);
  document.body.appendChild(style);
  const q = query => (tokens, ...args) => {
    const selector = createSubSelector(query, rootSelector);
    const style = document.createElement("style");
    style.innerHTML = generate(selector, tokens, ...args);
    document.body.appendChild(style);
    return view;
  };
  const view = () => {
    spec({ data: { [data]: true } });
  };
  view.q = q;
  view.data = data;
  view.dataObj = { [data]: true };
  view.specObj = { data: view.dataObj };
  return view;
};

export const css = css => {
  const style = document.createElement("style");
  style.innerHTML = css;
  document.body.appendChild(style);
};

export const withData = (prop: string, value?: string | boolean) => {
  spec({ data: { [prop]: value !== undefined ? value : true } });
};
