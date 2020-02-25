import { createStore, createEvent } from "effector";

export type Tag = { type: string; value: string };

export type Game = {
  title: string;
  image: string;
  description: string;
  rating: number;
  hours: number | string;
  links: {
    review: string;
  };
  pros: string[];
  cons: string[];
  tags: Tag[];
};

export const gamesLoaded = createEvent<Game[]>();

export const $gamesList = createStore<Game[]>(
  process.env.NODE_ENV === "development" ? JSON.parse(localStorage.games) : []
);

$gamesList.on(gamesLoaded, (state, games) => games);

globalThis.gamesLoaded = gamesLoaded;
