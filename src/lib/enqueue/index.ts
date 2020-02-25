import { createEvent } from "effector";

export const createQueue = () => {
  const passed = createEvent();

  let isBlocked = false;
  let timeout;
  const enqueue = (cb: Function, time: number) => {
    if (!isBlocked) {
      console.log("is not blocked");
      cb();
      isBlocked = true;
      clearTimeout(timeout);
      timeout = setTimeout(passed, time);
    } else {
      console.log("is blocked");
      const unsub = passed.watch(() => {
        console.log("is passed");
        unsub();
        enqueue(cb, time);
      });
    }
  };

  passed.watch(() => {
    isBlocked = false;
  });

  return enqueue;
};
