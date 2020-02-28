import { createReq } from "@/lib/api";
import { createEffect, createStore, sample, combine, forward } from "effector";

import { $token } from "@/api/session";

type GetStats = {
  payload: {};
  response: {
    error: false;
    stats: [number];
    passed: number;
    total: number;
  };
};

type CheckGiveaway = {
  payload: {
    uid: string;
    contact: string;
    answers: string[];
  };
  response: {
    error: false;
    contact: string;
    answers: string[];
  };
};

type GetGiveawayResults = {
  payload: {
    uid: string;
  };
  response: {
    error: false;
    contact: string;
    answers: string[];
  };
};

export const getStats = createEffect<GetStats["payload"], GetStats["response"]>(
  {
    handler: createReq("GET", "api/stats")
  }
);

export const checkGiveaway = createEffect<
  CheckGiveaway["payload"],
  CheckGiveaway["response"]
>({
  handler: createReq("POST", "api/check")
});

export const getGiveawayResults = createEffect<
  GetGiveawayResults["payload"],
  GetGiveawayResults["response"]
>({
  handler: createReq("POST", "api/results")
});

export const $contact = createStore<string>("");
export const $passedCount = createStore<number[]>([0, 0, 0, 0, 0]);
export const $allPassedCount = createStore<number>(0);
export const $participantsCount = createStore<number>(0);
export const $trueAnswers = createStore([null, null, null, null, null]);

export const $stats = combine(
  $passedCount,
  $participantsCount,
  (counts, total) => counts.map(count => count / total)
);

$passedCount.on(getStats.done, (state, { result }) => result.stats);

$allPassedCount.on(getStats.done, (state, { result }) => result.passed);

$participantsCount.on(getStats.done, (state, { result }) => result.total);

$contact.on(getGiveawayResults.done, (state, { result }) => result.contact);

$trueAnswers
  .on(getGiveawayResults.done, (state, { result }) => result.answers)
  .on(checkGiveaway.done, (state, { result }) => result.answers);

sample({
  source: combine({ uid: $token }),
  target: getGiveawayResults
});

getStats({});
getGiveawayResults({ uid: $token.getState() });

forward({
  from: checkGiveaway.done,
  to: getStats.prepend(() => ({}))
});
