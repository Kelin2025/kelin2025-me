import { createReq } from "@/lib/api";
import { createStore, createEffect } from "effector";
import { createStorage } from "@/lib/localstorage";

export type Contestant = {
  contact: string;
  passed: boolean;
};

type GetContestants = {
  payload: {};
  response: Contestant[];
};

export const getContestants = createEffect<
  GetContestants["payload"],
  GetContestants["response"]
>({
  handler: createReq("GET", "api/contestants")
});

export const $contestants = createStore<Contestant[]>([]);
export const $winners = createStorage({
  key: "winners",
  value: [null, null, null],
  json: true
});

$contestants.on(getContestants.done, (state, { result }) => result);

getContestants({});
