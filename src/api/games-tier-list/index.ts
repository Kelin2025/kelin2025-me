import { createStore, combine, createEffect } from "effector";

export type Game = {
  _id: string;
  appid: number;
  name: string;
  review: string;
  tier: string;
  video: string;
  steam: {
    icon: string;
    logo: string;
    about: string;
  };
};

export const loadGames = createEffect<void, Game[]>({
  handler: () => fetch("https://kelin2025.me/api/games").then((r) => r.json()),
});

export const $allGames = createStore<Game[]>([]);

export const $gamesTiers = $allGames.map((games) =>
  games.reduce(
    (res, { tier }) => (res.includes(tier) ? res : res.concat(tier)),
    ["S", "A", "B", "C", "D"] as string[]
  )
);

export const $gamesByTiers = combine($gamesTiers, $allGames, (tiers, games) =>
  tiers.reduce(
    (res, tier) => ({
      ...res,
      [tier]: games.filter((game) => game.tier === tier),
    }),
    {} as { [key: string]: Game[] }
  )
);

$allGames.on(loadGames.doneData, (state, games) => games);

$allGames.watch(console.log);

loadGames();
