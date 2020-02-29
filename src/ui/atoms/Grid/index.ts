import { specCb } from "@/lib/spec";
import { h, spec } from "effector-dom";

export const createGrid = ({ gap = 16, cols }) => {
  return child => {
    h("div", () => {
      spec({
        data: { grid: true },
        styleVar: {
          gap: `${gap}px`,
          cols: typeof cols === "number" ? `repeat(${cols}, 1fr)` : cols
        }
      });
      specCb(child);
    });
  };
};

type Data = {
  gap?: number;
  cols?: number | string;
  flow?: "row" | "column";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "space-between";
};

export const Grid = (
  { gap = 16, cols, flow = "row", align = "start", justify = "start" }: Data,
  child
) => {
  h("div", () => {
    spec({
      data: { grid: true },
      styleVar: {
        gap: `${gap}px`,
        flow,
        align,
        justify,
        cols: typeof cols === "number" ? `repeat(${cols}, 1fr)` : cols
      }
    });
    specCb(child);
  });
};

export const ColumnGrid = createGrid({ cols: 1 });
