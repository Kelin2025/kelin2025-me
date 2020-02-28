import { css } from "~lib/styled";
import { h, spec } from "effector-dom";
import { specCb, SpecData } from "~lib/spec";

css`
  [data-button] {
    --color: rgba(255, 255, 255, 0.1);
    background: var(--color);
    border-radius: 20px;
    border: none;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font: 500 16px/16px "Segoe UI", sans-serif;
    padding: 10px 20px;
    transition: opacity 0.1s ease-out, color 0.2s ease-out,
      background 0.2s ease-out;
    text-align: center;
  }

  [data-button][disabled] {
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
  }

  [data-button]:not([disabled]):hover,
  [data-button]:not([disabled]):focus {
    outline: none;
    opacity: 0.75;
  }

  [data-button]:active {
    opacity: 0.5;
  }

  [data-button][data-full] {
    width: 100%;
  }

  [data-button][data-size="form"] {
    height: 51px;
    padding: 15px 20px;
    border-radius: 30px;
  }

  [data-button][data-type="primary"] {
    --color: #577bf9;
  }

  [data-button][data-type="secondary"] {
    --color: #f95793;
  }

  [data-button][data-type="donate"] {
    --color: #ff7f23;
  }

  [data-button][data-type="subscribe"] {
    --color: #9e57f9;
  }

  [data-button] [data-icon] {
    vertical-align: -2px;
    --size: 24px;
    margin-top: -4px;
    margin-bottom: -4px;
  }
`;

export const Button = ({ type, text, click }, specOptions?: SpecData) => {
  h("button", () => {
    spec({
      text,
      handler: { click },
      data: { type, button: true }
    });
    specCb(specOptions);
  });
};

export const Link = ({ text, href, target }, specOptions?: SpecData) => {
  h("a", () => {
    spec({
      text,
      attr: { text, href, target },
      data: { button: true }
    });
    specCb(specOptions);
  });
};
