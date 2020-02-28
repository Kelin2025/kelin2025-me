import { combine } from "effector";
import { list, h, spec } from "effector-dom";
import { eventWithData } from "~lib/dom-utils";

import { $stats, $trueAnswers, $allPassedCount } from "~api/giveaway";
import {
  $isDirty,
  $contactField,
  $placeholders,
  $isAllValid,
  $canSubmit,
  $answersField,
  contactChanged,
  answerChanged,
  submitPressed
} from "../logic";

import { ColumnGrid, Label, Input, Button, Card } from "~ui";

export const GiveawayForm = () => {
  ColumnGrid(() => {
    Label("Ваш контакт для связи (Ссылка VK/Telegram/Discord/итд)", () => {
      Input(
        { value: $contactField, change: contactChanged },
        {
          attr: { disabled: $isAllValid },
          data: { valid: $isAllValid, dirty: $isAllValid }
        }
      );
    });
    list($answersField, ({ store, index }) => {
      const $trueAnswer = $trueAnswers.map(answers => answers[index]);
      const $isValid = $trueAnswer.map(Boolean);
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
                valid: $isValid,
                dirty: combine(
                  $isDirty,
                  $trueAnswer,
                  store,
                  (isDirty, trueAnswer, state) =>
                    state && (isDirty || !!trueAnswer) ? true : false
                )
              },
              attr: {
                disabled: $isValid,
                placeholder: $placeholders.map(list => list[index])
              }
            });
          }
        );
        h("div", () => {
          spec({
            text: "КЛЮЧ: IAMAHUNTERPOG",
            visible: store.map(() => index === 4),
            style: {
              color: "rgba(0,0,0,0.07)",
              marginTop: "-30px",
              marginLeft: "10px",
              pointerEvents: "none"
            }
          });
        });
        h("div", () => {
          spec({
            visible: $isValid,
            text: $stats.map(
              stats =>
                `Этот ключ нашли ${Math.floor(stats[index] * 100)}% участников`
            ),
            data: { color: "green" }
          });
        });
      });
    });
  });
  Button(
    { type: "primary", text: "Отправить", click: submitPressed },
    {
      attr: { disabled: $canSubmit.map(canSubmit => !canSubmit) },
      visible: $isAllValid.map(isAllValid => !isAllValid)
    }
  );
  Card(() => {
    spec({ visible: $isAllValid, style: { textAlign: "center" } });
    h("div", {
      text:
        "Все правильно! Не забудь прийти на стрим в день выхода Ori, чтобы не упустить свой приз!"
    });
    h("div", {
      text: $allPassedCount.map(
        count => `Полностью справились с заданием ${count} человек!`
      )
    });
  });
};
