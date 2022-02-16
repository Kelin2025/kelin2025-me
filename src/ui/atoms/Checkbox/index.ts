import { h, spec } from "forest";
import { SpecData, specCb } from "@/lib/spec";

import "./index.css";

export const Checkbox = ({ value, label, change }, specData?: SpecData) => {
  h("label", () => {
    spec({ data: { checkbox: true } });
    h("span", { text: label });
    h("input", {
      attr: { type: "checkbox", value },
      handler: { change: change.prepend(evt => evt.target.checked) }
    });
    h("span", { data: { checkmark: true } });
    specCb(specData);
  });
};
