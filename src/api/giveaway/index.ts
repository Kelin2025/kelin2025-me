import { getParsedStorageItem } from "~lib/localStorage";
import { createEffect, createStore } from "effector";
import { req, createReq } from "~lib/api";

type CheckGiveaway = {
  payload: {
    uid: string;
    contact: string;
    answers: string[];
  };
  response: {
    error: false;
    answers: boolean[];
  };
};

export const checkGiveaway = createEffect<
  CheckGiveaway["payload"],
  CheckGiveaway["response"]
>({
  handler: createReq("POST", "api/check")
});

type GetGiveawayResults = {
  payload: { uid: string };
  response: { error: false; answers: string[] };
};
export const getGiveawayResults = createEffect<
  GetGiveawayResults["payload"],
  GetGiveawayResults["response"]
>({
  handler: createReq("POST", "api/results")
});

export const $trueAnswers = createStore(
  getParsedStorageItem<string[]>("giveaway1.trueAnswers", ["", "", "", "", ""])
);
