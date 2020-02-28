import { createStore, createEvent } from "effector";

export type Tag = { type: string; value: string };

export type Challenge = {
  title: string;
  description: string;
  icon: string;
  video: string;
  tags: Tag[];
};

export const challengesLoaded = createEvent<Challenge[]>();

export const $challengesList = createStore<Challenge[]>(
  process.env.NODE_ENV === "development"
    ? JSON.parse(localStorage.challenges)
    : []
);

export const $challengesGames = $challengesList.map(list =>
  list.reduce((res, cur) => {
    for (const tag of cur.tags) {
      if (tag.type === "game" && !res.some(cur => cur.value === tag.value)) {
        res.push(tag);
      }
    }
    return res;
  }, [])
);

export const $challengesGroups = $challengesList.map(list =>
  list.reduce((res, cur) => {
    for (const tag of cur.tags) {
      if (tag.type === "group" && !res.some(cur => cur.value === tag.value)) {
        res.push(tag);
      }
    }
    return res;
  }, [])
);

$challengesList.on(challengesLoaded, (state, list) => list);

window.challengesLoaded = challengesLoaded;
