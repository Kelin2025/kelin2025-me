import { createStore, combine } from "effector";

type Game = {
  id: number;
  tier: string;
  review: string;
  image: string;
};

export const $allGames = createStore<Game[]>([
  { id: "test", tier: "S", review: "Hello there", image: null },
  { id: "test", tier: "A", review: "Hello there", image: null },
  { id: "test", tier: "B", review: "Hello there", image: null },
  { id: "test", tier: "C", review: "Hello there", image: null },
  { id: "test", tier: "D", review: "Hello there", image: null },
]);

export const $gamesTiers = $allGames.map((games) =>
  games.reduce(
    (res, { tier }) => (res.includes(tier) ? res : res.concat(tier)),
    []
  )
);

export const $gamesByTiers = combine($gamesTiers, $allGames, (tiers, games) =>
  tiers.reduce(
    (res, tier) => ({
      ...res,
      [tier]: games.filter((game) => game.tier === tier),
    }),
    {}
  )
);
