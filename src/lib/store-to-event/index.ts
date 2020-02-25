import { Store, createEvent } from "effector";

export const storeToEvent = <T>(store: Store<T>) => {
  const evt = createEvent<T>();
  setTimeout(() => {
    store.watch(evt);
  });
  return evt;
};
