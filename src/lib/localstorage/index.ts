import { createEvent } from "effector";

export const setStorageItem = createEvent<{
  key: string;
  value: any;
  json: boolean;
}>();
export const createStorageSetter = ({
  key,
  json
}: {
  key: string;
  json: boolean;
}) => setStorageItem.prepend(value => ({ key, value, json }));

setStorageItem.watch(({ key, value, json }) => {
  localStorage[key] = json ? JSON.stringify(value) : value;
});

export const getParsedStorageItem = <T>(key: string, def: T): T => {
  let value = def;
  try {
    value = JSON.parse(localStorage[key]);
  } catch (err) {
    setStorageItem({
      key,
      value: typeof def === "function" ? def() : def,
      json: true
    });
  }
  return value;
};
