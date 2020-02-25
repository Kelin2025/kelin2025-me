import { css } from "~lib/styled";
import { specCb } from "~lib/spec";
import { h, spec } from "effector-dom";

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

  [data-input]:focus {
    outline: none;
    box-shadow: 0 0 0 2px #577bf9 inset;
  }
`;

export const Input = ({ value, change, multiline = false }, extra = null) => {
  h(multiline ? "textarea" : "input", () => {
    spec({
      data: { input: true },
      attr: { value },
      handler: { input: change.prepend(evt => evt.target.value) }
    });
    specCb(extra);
  });
};
