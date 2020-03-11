import {
  createEvent,
  createStore,
  guard,
  sample,
  combine,
  forward
} from "effector";
import { h, spec, list, remap } from "effector-dom";

import { $winners, $contestants, Contestant } from "@/api/results";

import twitch from "@/ui/assets/icons/twitch.svg";
import youtube from "@/ui/assets/icons/youtube.svg";
import icon from "@/ui/assets/icons/winner.svg";
import {
  Card,
  Grid,
  Button,
  PageTitle,
  ColumnGrid,
  PageDescription
} from "@/ui";

const title = "Первая копия";
const link = "/roll/1";
const meta = { icon, width: 1000 };

const startRolling = createEvent<void>();
const filterParticipants = createEvent<Contestant["contact"][]>();

const roll = createEvent<number>();
const getWinner = createEvent<void>();

const $time = createStore<number>(0);
const $winner = $winners.map(winners => winners[0]);
const $participants = $contestants;

const $filteredParticipants = createStore<Contestant["contact"][]>([]);

const $rest = combine(
  $participants.map(x => x.map(e => e.contact)),
  $filteredParticipants,
  (x, all) => x.filter(e => !all.includes(e))
);

const $amountOfParticipants = $participants
  .map(e => e.length)
  .map(e => [e, Math.floor(e / 3), Math.floor(e / 6), 10, 7, 5, 3, 1]);

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
$winners.on(sample($rest, getWinner), (state, participants) => [
  participants[0],
  ...state.slice(1)
]);

guard({
  source: $time,
  filter: time => time >= 0
}).watch(time => {
  if (time > 0) setTimeout(() => roll(time - 1), 1000);
  let rest = $rest.getState();

  const n = rest.length - $amountOfParticipants.getState()[7 - time];
  const additional = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * rest.length);
    additional.push(rest[idx]);
    rest = [...rest.slice(0, idx), ...rest.slice(idx + 1)];
  }

  filterParticipants(additional);
});

guard({
  source: $time,
  filter: time => time === 0,
  target: getWinner
});

forward({
  from: startRolling,
  to: roll.prepend(() => 7)
});

$filteredParticipants
  .on(startRolling, () => [])
  .on(filterParticipants, (a, b) => [...a, ...b]);

const view = () => {
  PageTitle("Тот Самый Розыгрыш #1 - Первая копия");
  PageDescription(() => {
    h("p", {
      text:
        "Первая копия игры разыгрывается среди тех, кто отгадал хотя бы один ключ"
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
          click: startRolling
        },
        { visible: $isRolling.map(isRolling => !isRolling) }
      );
    });
    ColumnGrid(() => {
      Card(() => {
        spec({ style: { maxHeight: "70vh", overflowY: "overlay" } });
        h("h2", {
          text: $participants.map(
            participants => `Всего участников: ${participants.length}`
          ),
          style: { margin: "0 0 20px" }
        });
        list($rest, ({ store }) => {
          h("h4", {
            text: store,
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

export const Results1Page = { title, link, view, meta };
