import { h, spec } from "forest";
import { createEvent, createStore, guard } from "effector";
import { Separator } from "@/ui/atoms/Separator";

import "./index.css";

type Data = {
  title: Function;
  child: Function;
  controls?: Function;
};

export const Modal = ({ title, child, controls }: Data) => {
  const $isOpened = createStore(false);
  const open = createEvent<any>();
  const close = createEvent<any>();
  const overlayClicked = createEvent<MouseEvent>();

  $isOpened.on(open, () => true).on(close, () => false);

  guard({
    source: overlayClicked,
    filter: evt => evt.target === evt.currentTarget,
    target: close
  });

  h("div", () => {
    spec({
      visible: $isOpened,
      data: { modalOverlay: true },
      handler: { click: overlayClicked }
    });
    h("div", () => {
      spec({ data: { modal: true } });
      h("div", () => {
        spec({ data: { modalTitle: true } });
        title({ open, close });
      });
      Separator();
      h("div", () => {
        spec({ data: { modalChild: true } });
        child({ open, close });
      });
      if (controls) {
        h("div", () => {
          spec({ data: { modalControls: true } });
          controls({ open, close });
        });
      }
    });
  });

  return { open, close };
};
