import { createEvent, createStore, forward, sample } from "effector";
import { getParsedStorageItem, createStorageSetter } from "~lib/localstorage";

import { $token } from "~api/session";
import { $contact, $trueAnswers, checkGiveaway } from "~api/giveaway";

export const contactChanged = createEvent<string>();
export const submitPressed = createEvent<string>();
export const answerChanged = createEvent<{ index: number; value: string }>();

export const $isDirty = createStore(false);
export const $contactField = createStore("");
export const $answersField = createStore(
  getParsedStorageItem<string[]>("giveaway1.answers", ["", "", "", "", ""])
);
export const $placeholders = createStore([
  "Ответ хранит сосуд, что чист внутри",
  "Его найдешь ты в обители хранителя",
  "Сей ключ скажу я лично, увидь лишь ты меня",
  "Меня увидит лишь находчивый охотник",
  "Просто напиши ключ лоооол"
]);
export const $isAllValid = $trueAnswers.map(answers => answers.every(Boolean));

$contactField
  .on(contactChanged, (state, value) => value)
  .on($contact, (state, value) => value);

$answersField.on(answerChanged, (state, { index, value }) => {
  const next = [...state];
  next[index] = value;
  return next;
});

$isDirty.on(checkGiveaway.done, () => true);

forward({
  from: $answersField.updates,
  to: createStorageSetter<string[]>({ key: "giveaway1.answers", json: true })
});

sample({
  source: {
    uid: $token,
    contact: $contactField,
    answers: $answersField
  },
  clock: submitPressed,
  target: checkGiveaway
});
