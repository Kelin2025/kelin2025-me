import nanoid from "nanoid";
import { createStore } from "effector";
import { getParsedStorageItem } from "@/lib/localstorage";

export const $token = createStore<string>(
  getParsedStorageItem<string>("token", nanoid)
);
