import { hashToText } from "@/lib/hash-parser";
import { $firstRoute } from "@/lib/route";
import { applyFilters, combineFilters, createFilter } from "@/lib/filters";
import { createEvent, createStore, combine } from "effector";

import { $gamesList, Game } from "@/api/games";
import { strIncludesWords } from "@/lib/text-search";

type Sort = (a: Game, b: Game) => number;

export const tagToggled = createEvent<string>();
export const searchInputChanged = createEvent<string>();
export const gameFromRouteOpened = createEvent<string>();
export const gameModalTriggered = createEvent<string>();

export const $tags = createStore<string[]>([]);
export const $searchInput = createStore<string>("");
export const $sort = createStore<Sort>((a, b) => (a.title > b.title ? 1 : -1));
export const $filteredGames = combineFilters(
  [
    createFilter($gamesList, $searchInput, (game, input) => {
      if (!input) {
        return true;
      }
      const words = input.split(" ").map(word => word.toLocaleLowerCase());
      return strIncludesWords(game.title, words);
    }),
    createFilter($gamesList, $tags, (game, tags) => {
      if (!tags.length) {
        return true;
      }
      return tags.every(tagValue =>
        game.tags.some(tag => tagValue === tag.value)
      );
    })
  ],
  $gamesList
);

$tags.on(tagToggled, (state, tag) => {
  const idx = state.indexOf(tag);
  if (idx === -1) {
    return [...state, tag];
  }
  const next = [...state];
  next.splice(idx, 1);
  return next;
});

$searchInput.on(searchInputChanged, (state, value) => value);

gameFromRouteOpened.watch(game => {
  setTimeout(gameModalTriggered, 500, game);
});

$firstRoute.watch(({ route, hash }) => {
  if (route === "/games") {
    gameFromRouteOpened(hashToText(hash));
  }
});
