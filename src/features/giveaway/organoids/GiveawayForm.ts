import { combine } from "effector";
import { list, h, spec } from "effector-dom";
import { eventWithData } from "~lib/dom-utils";

import { $trueAnswers } from "~api/giveaway";
import {
  $isDirty,
  $contactField,
  $placeholders,
  contactChanged,
  $answersField,
  answerChanged,
  submitPressed,
  $isAllValid
} from "../logic";

import { ColumnGrid, Label, Input, Button } from "~ui";

export const GiveawayForm = () => {
  ColumnGrid(() => {
    Label("Ваш контакт для связи (Ссылка VK/Telegram/Discord/итд)", () => {
      Input(
        { value: $contactField, change: contactChanged },
        {
          attr: { disabled: $isAllValid },
          data: { valid: $isAllValid, dirty: true }
        }
      );
    });
    list($answersField, ({ store, index }) => {
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
  Button(
    { type: "primary", text: "Отправить", click: submitPressed },
    { visible: $isAllValid.map(isAllValid => !isAllValid) }
  );
  h("div", {
    visible: $isAllValid,
    text:
      "Все правильно! Не забудь прийти на стрим в день выхода Ori, чтобы не упустить свой приз!",
    style: { textAlign: "center" }
  });
};
