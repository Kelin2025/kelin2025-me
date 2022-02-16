import { Store, combine } from "effector";

type FilterPair<T, U> = [Store<U>, (item: T, state: U, idx: number) => boolean];

export const applyFilters = <T>(
  filters: ((item: T) => boolean)[],
  items: T[]
) => {
  return items.filter((item) => filters.every((filter) => filter(item)));
};

export const createFilter = <T, U>(
  list: Store<T[]>,
  payload: Store<U>,
  cb: (item: T, state: U, idx: number) => boolean
) => {
  return combine(list, payload, (list, payload) =>
    list.map((item, idx) => cb(item, payload, idx))
  );
};

export const combineFilters = <T>(
  filters: Store<boolean[]>[],
  list: Store<T[]>
): Store<T[]> => {
  return combine(...filters, list, (...args) => {
    const filters = args.slice(0, -1);
    const list = args.slice(-1)[0];
    return list.filter((_, idx) => filters.every((bools) => bools[idx]));
  });
};
