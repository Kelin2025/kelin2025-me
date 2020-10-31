import { Store, Event, is, createEvent, sample, createStore } from "effector";
import { spec, remap } from "forest";

export const eventWithData = <U, State, TargetData>(
  store: State | Store<State>,
  event: Event<TargetData>,
  cb?: (data: State, evt: U) => TargetData
) => {
  const trigger = createEvent<U>();
  sample({
    source: is.store(store) ? store : createStore(store),
    clock: trigger,
    fn: cb || ((state) => state as TargetData),
    target: event,
  });
  return trigger;
};

export const visible = <T, S extends keyof T>(
  state: Store<T>,
  key?: ((state: T) => boolean) | S
) => {
  let visible: Store<any> = state;
  if (key) {
    if (typeof key === "string") {
      visible = remap(visible, key);
    } else {
      visible = visible.map(key);
    }
  } else {
    visible = visible.map(Boolean);
  }
  spec({ visible });
};

const redirect = createEvent<string>();

export const navigate = <T>(store: Store<string>) =>
  eventWithData<T>(store, redirect);

redirect.watch((url) => {
  window.open(url, "_blank");
});
