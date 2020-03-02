import { textToHash, hashToText } from "@/lib/hash-parser";
import { routeChanged, $firstRoute } from "@/lib/route";
import { createEvent, createStore, combine, forward } from "effector";

import { $gamesList } from "@/api/games";

export const searchInputChanged = createEvent<string>();
export const gameFromRouteOpened = createEvent<string>();
export const gameModalTriggered = createEvent<string>();

export const $searchInput = createStore("");
export const $filteredGames = combine(
  $searchInput,
  $gamesList,
  (input, games) => {
    return games.filter(game => {
      const words = input.split(" ").map(word => word.toLocaleLowerCase());
      for (const word of words) {
        if (!game.title.toLocaleLowerCase().includes(word)) {
          if (
            !game.tags.some(tag => tag.value.toLocaleLowerCase().includes(word))
          ) {
            return false;
          }
        }
      }
      return true;
    });
  }
);

$searchInput.on(searchInputChanged, (state, value) => value);

forward({
  from: $searchInput,
  to: routeChanged.prepend(value =>
    value ? `/games#${textToHash(value)}` : "/games"
  )
});

gameFromRouteOpened.watch(game => {
  setTimeout(gameModalTriggered, 500, game);
});

$firstRoute.watch(({ route, hash }) => {
  if (route === "/games") {
    gameFromRouteOpened(hashToText(hash));
  }
});
