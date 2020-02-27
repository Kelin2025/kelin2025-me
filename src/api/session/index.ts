import nanoid from "nanoid";
import { createStore } from "effector";

let token = localStorage.sessionToken;
if (!token) {
  localStorage.sessionToken = nanoid();
  token = localStorage.sessionToken;
}

export const $token = createStore<string>(token);
