import { createEvent, createStore } from "effector";

export const setStorageItem = createEvent<{
  key: string;
  value: any;
  json: boolean;
}>();
export const createStorageSetter = <T>({
  key,
  json
}: {
  key: string;
  json: boolean;
}) => setStorageItem.prepend<T>(value => ({ key, value, json }));

setStorageItem.watch(({ key, value, json }) => {
  localStorage[key] = json ? JSON.stringify(value) : value;
});

export const getParsedStorageItem = <T>(key: string, def: T): T => {
  let value = typeof def === "function" ? def() : def;
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

export const createStorage = ({ key, value, json }) => {
  let initValue = json
    ? getParsedStorageItem(key, value)
    : localStorage[key] || value;
  const store = createStore(initValue);

  store.updates.watch(value => {
    setStorageItem({ key, value, json });
  });

  return store;
};
