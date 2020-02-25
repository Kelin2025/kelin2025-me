import { createEvent } from "effector";

export const copyText = createEvent<string>();

copyText.watch((str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
});
