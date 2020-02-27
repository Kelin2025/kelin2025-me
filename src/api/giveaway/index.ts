import { createReq } from "~lib/api";
import { getParsedStorageItem, createStorageSetter } from "~lib/localStorage";
import { createEffect, createStore, sample, combine, forward } from "effector";

import { $token } from "~api/session";

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

export const $trueAnswers = createStore(
  getParsedStorageItem<string[]>("giveaway1.trueAnswers", [
    null,
    null,
    null,
    null,
    null
  ])
);

$contact.on(getGiveawayResults.done, (state, { result }) => result.contact);

$trueAnswers
  .on(getGiveawayResults.done, (state, { result }) => result.answers)
  .on(checkGiveaway.done, (state, { result }) => result.answers);

sample({
  source: combine({ uid: $token }),
  target: getGiveawayResults
});

forward({
  from: $trueAnswers.updates,
  to: createStorageSetter<string[]>({
    key: "giveaway1.trueAnswers",
    json: true
  })
});

getGiveawayResults({ uid: $token.getState() });
