import { createEffect } from "effector";

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
  handler: ({ uid, contact, answers }) => {
    return fetch("https://kelin2025.me/api/check", {
      method: "POST",
      body: JSON.stringify({ uid, contact, answers })
    }).then(r => r.json());
  }
});

type GetResults = {
  payload: { uid: string };
  response: { error: false; answers: string[] };
};
export const getResults = createEffect<
  GetResults["payload"],
  GetResults["response"]
>({
  handler: ({ uid }) => {
    return fetch("https://kelin2025.me/api/results", {
      method: "POST",
      body: JSON.stringify({ uid })
    }).then(r => r.json());
  }
});
