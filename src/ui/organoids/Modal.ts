import { css } from "~lib/styled";
import { h, spec } from "effector-dom";
import { createEvent, createStore, guard } from "effector";
import { Separator } from "~ui/atoms/Separator";

type Data = {
  title: Function;
  child: Function;
  controls?: Function;
};

css`
  [data-modal-overlay] {
    align-items: center;
    animation: modalOverlay 0.4s ease-out;
    background: rgba(0, 0, 0, 0.8);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }

  [data-modal] {
    --width: 600px;
    animation: modalWindow 0.2s ease-out;
    background: var(--color-card-bg);
    border-radius: 10px;
    max-width: 100%;
    padding: 20px;
    grid-gap: 20px;
    width: var(--width);
    max-height: calc(100% - 40px);
    overflow: auto;
    display: grid;
    grid-template-rows: max-content max-content 1fr max-content;
  }

  [data-modal-child] {
    padding-right: 10px;
    overflow: auto;
  }

  @media only scren and (max-width: 640px) {
    [data-modal] {
      border-radius: none;
      height: 100%;
      width: 100%;
    }
  }

  @keyframes modalOverlay {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes modalWindow {
    0% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0);
    }
  }
`;

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
