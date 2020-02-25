import { createQueue } from "~lib/enqueue";
import { createTransition } from "~lib/transition";
import { $currentRoute } from "~lib/route";

export const pageQueue = createQueue();

export const pageTransition = createTransition(
  { duration: 150, gap: 50, queue: pageQueue },
  [
    { transform: "translateY(-10px)", opacity: 0 },
    { transform: "translateY(0)", opacity: 1 }
  ]
);

$currentRoute.watch(() => {
  setTimeout(() => {
    pageTransition.trigger();
  }, 0);
});
