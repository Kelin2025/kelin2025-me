import { createStore, createEvent } from "effector";

import games from "@/db/games.json";

export type Tag = { type: string; value: string };

export type Game = {
  title: string;
  image: string;
  description: string[];
  rating: string;
  hours: number | string;
  links: {
    review: string;
  };
  pros: string[];
  cons: string[];
  tags: Tag[];
};

export const gamesLoaded = createEvent<Game[]>();

export const $gamesList = createStore<Game[]>(games);
export const $tagsList = $gamesList.map((games) => {
  return games.reduce<Tag[]>((res, game) => {
    res.push(
      ...game.tags.filter(
        (curTag) =>
          !res.some((tag) => tag.value === curTag.value) &&
          curTag.type !== "hidden"
      )
    );
    return res;
  }, []);
});
export const $genresList = $tagsList.map((tags) =>
  tags.filter((tag) => tag.type === "genre")
);
export const $viewsList = $tagsList.map((tags) =>
  tags.filter((tag) => tag.type === "view")
);

$gamesList.on(gamesLoaded, (state, games) => games);
