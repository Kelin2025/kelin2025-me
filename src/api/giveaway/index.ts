import { createReq } from "~lib/api";
import { getParsedStorageItem, createStorageSetter } from "~lib/localstorage";
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
export const $trueAnswers = createStore([null, null, null, null, null]);

$contact.on(getGiveawayResults.done, (state, { result }) => result.contact);

$trueAnswers
  .on(getGiveawayResults.done, (state, { result }) => result.answers)
  .on(checkGiveaway.done, (state, { result }) => result.answers);

sample({
  source: combine({ uid: $token }),
  target: getGiveawayResults
});

getGiveawayResults({ uid: $token.getState() });
