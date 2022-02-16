import { specCb } from "@/lib/spec";
import { h, spec } from "forest";
import { Store, Event } from "effector";

import "./index.css";

type Data = {
  value: Store<string>;
  change: Event<string>;
  multiline?: boolean;
};

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
