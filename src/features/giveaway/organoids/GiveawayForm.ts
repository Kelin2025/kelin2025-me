import { list, h, spec } from "effector-dom";
import { eventWithData } from "~lib/dom-utils";
import { createStore, createEvent, sample } from "effector";

import { ColumnGrid, Label, Input, Button } from "~ui";

const contactChanged = createEvent<string>();
const submitPressed = createEvent<string>();
const phraseChanged = createEvent<{ index: number; value: string }>();

const $contact = createStore("");
const $phrases = createStore(["", "", "", "", ""]);
const $placeholders = createStore([
  "Ответ хранит сосуд, что чист внутри",
  "Его найдешь ты в обители хранителя",
  "Сей ключ скажу я лично, увидь лишь ты меня",
  "Меня увидит лишь находчивый охотник",
  ""
]);

$contact.on(contactChanged, (state, value) => value);

$phrases.on(phraseChanged, (state, { index, value }) => {
  const next = [...state];
  next[index] = value;
  return next;
});

sample({
  source: { contact: $contact, phrases: $phrases },
  clock: submitPressed
}).watch(console.log);

export const GiveawayForm = () => {
  ColumnGrid(() => {
    Label("Ваш контакт для связи (VK/Telegram/Discord/итд)", () => {
      Input({ value: $contact, change: contactChanged });
    });
    list($phrases, ({ store, index }) => {
      Label(`Ключ №${index + 1}`, () => {
        Input(
          {
            value: store,
            change: eventWithData(store, phraseChanged, value => ({
              index,
              value
            }))
          },
          { attr: { placeholder: $placeholders.map(list => list[index]) } }
        );
        h("div", () => {
          spec({
            text: "asdfasdfsadfsadfsdf",
            visible: store.map(() => index === 3),
            style: {
              color: "rgba(0,0,0,0.1)",
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
