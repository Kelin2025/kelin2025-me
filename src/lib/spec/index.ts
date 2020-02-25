import { is, createStore, Store } from "effector";

import { spec } from "effector-dom";

export type SpecData =
  | Parameters<typeof spec>[0]
  | Parameters<typeof spec>[0][]
  | Function
  | void;

export const specCb = (...args) => {
  args.forEach(arg => {
    if (typeof arg === "function") {
      arg();
    } else if (Array.isArray(arg)) {
      specCb(...arg);
    } else if (arg && typeof arg === "object") {
      spec(arg);
    }
  });
};

export const toStore = <T>(value: T | Store<T>) => {
  if (is.store(value)) {
    return value;
  }
  return createStore(value);
};
