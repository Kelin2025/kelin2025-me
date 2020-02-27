import { css } from "~lib/styled";
import { specCb } from "~lib/spec";
import { h, spec } from "effector-dom";
import { Store, Event } from "effector";

type Data = {
  value: Store<string>;
  change: Event<string>;
  multiline?: boolean;
};

css`
  [data-input] {
    background: #232628;
    border-radius: 5px;
    border: none;
    color: #fff;
    font: 400 16px/24px "Segoe UI", sans-serif;
    height: 51px;
    padding: 15px 20px;
    transition: box-shadow 0.1s ease-out;
    display: block;
    width: 100%;
  }

  textarea[data-input] {
    min-height: 150px;
  }

  [data-input][disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  [data-input]:focus {
    outline: none;
    box-shadow: 0 0 0 2px #577bf9 inset;
  }

  [data-input][data-dirty][data-valid] {
    color: var(--color-green);
    box-shadow: 0 0 0 2px var(--color-green) inset;
  }

  [data-input][data-dirty]:not([data-valid]) {
    color: var(--color-red);
    box-shadow: 0 0 0 2px var(--color-red) inset;
  }
`;

export const Input = (
  { value, change, multiline = false }: Data,
  extra = null
) => {
  h(multiline ? "textarea" : "input", () => {
    spec({
      data: { input: true },
      attr: { value },
      handler: { input: change.prepend(evt => evt.target.value) }
    });
    specCb(extra);
  });
};
