import { createEvent, createStore, sample } from "effector";

import { $token } from "~api/session";
import { $contact, $trueAnswers, checkGiveaway } from "~api/giveaway";

export const contactChanged = createEvent<string>();
export const submitPressed = createEvent<string>();
export const answerChanged = createEvent<{ index: number; value: string }>();

export const $isDirty = createStore(false);
export const $contactField = createStore("");
export const $answersField = createStore(["", "", "", "", ""]);
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

$answersField
  .on($trueAnswers, (state, answers) =>
    state.map((cur, idx) => answers[idx] || cur)
  )
  .on(answerChanged, (state, { index, value }) => {
    const next = [...state];
    next[index] = value;
    return next;
  });

$isDirty.on(checkGiveaway.done, () => true);

sample({
  source: {
    uid: $token,
    contact: $contactField,
    answers: $answersField
  },
  clock: submitPressed,
  target: checkGiveaway
});
