import { createEvent, createStore, guard, sample, combine } from "effector";
import { h, spec, list, remap } from "effector-dom";

import { $winners, $contestants } from "@/api/results";

import icon from "@/ui/assets/icons/winner.svg";
import {
  Card,
  Grid,
  Button,
  PageTitle,
  ColumnGrid,
  PageDescription
} from "@/ui";

const title = "Вторая копия";
const link = "/roll/2";
const meta = { icon, width: 1000 };

const roll = createEvent<number>();
const getWinner = createEvent<void>();

const $time = createStore<number>(0);
const $winner = $winners.map(winners => winners[1]);
const $participants = $contestants.map(contestants =>
  contestants.filter(contestant => contestant.passed)
);
const $isRolling = $time.map(time => time > 0);
const $isWinnerDisplayed = combine(
  $winner,
  $time,
  (winner, time) => !time && !!winner
);
const $isStubDisplayed = combine(
  $winner,
  $time,
  (winner, time) => !time && !winner
);

$time.on(roll, (state, time) => time);
$winners.on(sample($participants, getWinner), (state, participants) => [
  ...state.slice(0, 1),
  participants[Math.floor(Math.random() * participants.length)].contact,
  ...state.slice(-1)
]);

guard({
  source: $time,
  filter: time => time > 0
}).watch(time => {
  setTimeout(() => roll(time - 1), 1000);
});

guard({
  source: $time,
  filter: time => time === 0,
  target: getWinner
});

const view = () => {
  PageTitle("Тот Самый Розыгрыш #1 - Вторая копия");
  PageDescription(() => {
    h("p", {
      text: "Вторая копия игры разыгрывается среди тех, кто отгадал все ключи!"
    });
  });

  Grid({}, () => {
    spec({
      styleVar: {
        cols: "600px 400px"
      }
    });
    ColumnGrid(() => {
      ColumnGrid(() => {
        Card(() => {
          spec({ style: { textAlign: "center" }, visible: $isRolling });
          h("h3", {
            text: "Определяем победителя",
            style: { opacity: 0.5, fontWeight: 400 }
          });
          h("h2", {
            text: $time,
            style: { fontSize: "48px", margin: "20px 0" }
          });
        });
        Card(() => {
          spec({ style: { textAlign: "center" }, visible: $isWinnerDisplayed });
          h("h3", {
            text: "Победитель",
            style: { opacity: 0.5, fontWeight: 400 }
          });
          h("h2", {
            text: $winner,
            style: {
              fontSize: "48px",
              margin: "20px 0",
              userSelect: "all",
              wordBreak: "break-all"
            }
          });
        });
        Card(() => {
          spec({
            style: { textAlign: "center" },
            visible: $isStubDisplayed
          });
          h("h3", {
            text: "Нажми на кнопку - получишь результат",
            style: { opacity: 0.5, fontWeight: 400 }
          });
        });
      });
      Button(
        {
          type: "primary",
          text: "Определить победителя",
          click: roll.prepend(() => 5)
        },
        { visible: $isRolling.map(isRolling => !isRolling) }
      );
    });
    ColumnGrid(() => {
      Card(() => {
        spec({ style: { maxHeight: "700px", overflowY: "overlay" } });
        h("h2", {
          text: $participants.map(
            participants => `Всего участников: ${participants.length}`
          ),
          style: { margin: "0 0 20px" }
        });
        list($participants, ({ store }) => {
          h("h4", {
            text: remap(store, "contact"),
            style: {
              wordBreak: "break-all",
              margin: "0 0 10px",
              padding: "0 0 10px",
              borderBottom: "1px solid rgba(255,255,255,.2)"
            }
          });
        });
      });
    });
  });
};

export const Results2Page = { title, link, view, meta };
