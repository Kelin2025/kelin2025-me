import { variant, spec } from "effector-dom";
import { createStore, createEvent } from "effector";

export type Device = "phone" | "desktop";

export const screenResized = createEvent<Event>();

export const $screenWidth = createStore(window.innerWidth);

export const $device = $screenWidth.map(width => {
  if (width <= 800) {
    return "phone";
  }
  return "desktop";
});

export const device = (obj: { [key: Device]: Function }) => {
  return variant($device, obj);
};

export const onlyOn = (device: Device) => {
  spec({ visible: $device.map(cur => cur === device) });
};

$screenWidth.on(screenResized, () => window.innerWidth);

$device.watch(device => {
  document.body.dataset.device = device;
});

window.addEventListener("resize", evt => screenResized(evt));
