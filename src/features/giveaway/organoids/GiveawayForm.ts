import { list, h, spec } from "effector-dom";
import { eventWithData } from "~lib/dom-utils";
import { getParsedStorageItem, createStorageSetter } from "~lib/localstorage";
import { createStore, createEvent, sample, forward, combine } from "effector";

import { $token } from "~api/session";
import { $trueAnswers, checkGiveaway } from "~api/giveaway";

import { ColumnGrid, Label, Input, Button } from "~ui";

const contactChanged = createEvent<string>();
const submitPressed = createEvent<string>();
const answerChanged = createEvent<{ index: number; value: string }>();

const $isDirty = createStore(false);
const $contact = createStore("");
const $answers = createStore(
  getParsedStorageItem<string[]>("giveaway1.answers", ["", "", "", "", ""])
);
const $placeholders = createStore([
  "Ответ хранит сосуд, что чист внутри",
  "Его найдешь ты в обители хранителя",
  "Сей ключ скажу я лично, увидь лишь ты меня",
  "Меня увидит лишь находчивый охотник",
  "Просто напиши ключ лоооол"
]);

$contact.on(contactChanged, (state, value) => value);

$answers.on(answerChanged, (state, { index, value }) => {
  const next = [...state];
  next[index] = value;
  return next;
});

$isDirty.on(checkGiveaway.done, () => true);

forward({
  from: $answers.updates,
  to: createStorageSetter<string[]>({ key: "giveaway1.answers", json: true })
});

sample({
  source: {
    uid: $token,
    contact: $contact,
    answers: $answers
  },
  clock: submitPressed,
  target: checkGiveaway
});

export const GiveawayForm = () => {
  ColumnGrid(() => {
    Label("Ваш контакт для связи (Ссылка VK/Telegram/Discord/итд)", () => {
      Input({ value: $contact, change: contactChanged });
    });
    list($answers, ({ store, index }) => {
      const $trueAnswer = $trueAnswers.map(answers => answers[index]);
      Label(`Ключ №${index + 1}`, () => {
        Input(
          {
            value: store,
            change: eventWithData(store, answerChanged, (state, value) => ({
              index,
              value
            }))
          },
          () => {
            spec({
              data: {
                valid: $trueAnswer.map(Boolean),
                dirty: combine($isDirty, $trueAnswer, (a, b) => a || b)
              },
              attr: {
                disabled: $trueAnswer.map(Boolean),
                placeholder: $placeholders.map(list => list[index])
              }
            });
          }
        );
        h("div", () => {
          spec({
            text: "asdfasdfsadfsadfsdf",
            visible: store.map(() => index === 3),
            style: {
              color: "rgba(0,0,0,0.05)",
              marginTop: "-30px",
              marginLeft: "10px",
              pointerEvents: "none"
            }
          });
        });
      });
    });
  });
  Button({ type: "primary", text: "Отправить", click: submitPressed });
};
