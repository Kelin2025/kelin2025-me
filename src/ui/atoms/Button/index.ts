import { h, spec } from "forest";
import { specCb, SpecData } from "@/lib/spec";

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
