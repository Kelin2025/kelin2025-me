import { css } from "@/lib/styled";
import { Event } from "effector";
import { spec, handler } from "forest";

css`
  [data-clickable] {
    cursor: pointer;
  }
`;

export const attachClick = (click: Event<MouseEvent>) => {
  handler({ click });
  spec({ data: { clickable: true } });
};
