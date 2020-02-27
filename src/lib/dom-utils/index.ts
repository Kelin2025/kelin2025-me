import { Store, Event, is, createEvent, sample, createStore } from "effector";

export const eventWithData = <U, State, TargetData>(
  store: State | Store<State>,
  event: Event<TargetData>,
  cb?: (data: State, evt: U) => TargetData
) => {
  const trigger = createEvent<U>();
  sample({
    source: is.store(store) ? store : createStore(store),
    clock: trigger,
    fn: cb || (state => state as TargetData),
    target: event
  });
  return trigger;
};
