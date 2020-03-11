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
  PageDescription,
  Icon
} from "@/ui";

const title = "Третья копия";
const link = "/roll/3";
const meta = { icon, width: 1000 };

const roll = createEvent<number>();
const getWinner = createEvent<void>();

const $time = createStore<number>(0);
const $winner = $winners.map(winners => winners[2]);
const $participants = createStore([
  { contact: "Nekotash", from: "youtube" },
  { contact: "Лавашик Debil", from: "youtube" },
  { contact: "Kawaii Vessel UwU", from: "youtube" },
  { contact: "Frime Time", from: "youtube" },
  { contact: "Николай Дегтярев", from: "youtube" },
  { contact: "Ch1Ffy_", from: "youtube" },
  { contact: "Mr. SkyCoder", from: "youtube" },
  { contact: "Экструдик", from: "youtube" },
  { contact: "FlasherStep", from: "twitch" },
  { contact: "kireevmp", from: "twitch" },
  { contact: "dcversus", from: "twitch" },
  { contact: "kalenskij", from: "twitch" },
  { contact: "muffyli_r", from: "twitch" },
  { contact: "eLifes", from: "twitch" },
  { contact: "nbivi", from: "twitch" },
  { contact: "daydorogy", from: "twitch" }
]);
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
  ...state.slice(0, 2),
  participants[Math.floor(Math.random() * participants.length)].contact
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
  PageTitle("Тот Самый Розыгрыш #3 - Третья копия");
  PageDescription(() => {
    h("p", {
      text:
        "Третья копия игры разыгрывается среди спонсоров на YouTube и платных подписчиков на Twitch"
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
          h("h4", () => {
            spec({
              style: {
                wordBreak: "break-all",
                margin: "0 0 10px",
                padding: "0 0 10px",
                borderBottom: "1px solid rgba(255,255,255,.2)"
              }
            });
            Grid({ cols: "max-content 1fr", align: "center" }, () => {
              Icon({
                link: store.map(user =>
                  user.from === "twitch" ? twitch : youtube
                )
              });
              h("span", {
                text: remap(store, "contact")
              });
            });
          });
        });
      });
    });
  });
};

export const Results3Page = { title, link, view, meta };
