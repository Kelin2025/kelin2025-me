import { node } from "forest";
import { createEvent } from "effector";

export const createTransition = ({ duration, gap, queue }, animation) => {
  const trigger = createEvent();
  const cb = el => {
    const transition = el.animate(animation, {
      fill: "forwards",
      duration: duration,
      iterations: 1
    });
    transition.pause();
    trigger.watch(() => {
      transition.pause();
      transition.currentTime = 0;
      if (document.body.contains(el)) {
        if (queue) {
          queue(() => {
            transition.play();
          }, gap);
        } else {
          transition.play();
        }
      }
    });
  };
  cb.use = () => {
    node(cb);
  };
  cb.trigger = trigger;
  return cb;
};
