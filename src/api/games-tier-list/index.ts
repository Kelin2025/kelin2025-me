import { createStore, combine } from "effector";

type Game = {
  id: string;
  tier: string;
  review: string;
  steam: {
    id: number;
    icon: string;
  };
};

export const $allGames = createStore<Game[]>([
  {
    id: "test",
    tier: "S",
    review: "Hello there",
    steam: { id: 440, icon: "e3f595a92552da3d664ad00277fad2107345f743" },
  },
  {
    id: "test",
    tier: "A",
    review: "Hello there",
    steam: { id: 440, icon: "e3f595a92552da3d664ad00277fad2107345f743" },
  },
  {
    id: "test",
    tier: "B",
    review: "Hello there",
    steam: { id: 440, icon: "e3f595a92552da3d664ad00277fad2107345f743" },
  },
  {
    id: "test",
    tier: "C",
    review: "Hello there",
    steam: { id: 440, icon: "e3f595a92552da3d664ad00277fad2107345f743" },
  },
  {
    id: "test",
    tier: "D",
    review: "Hello there",
    steam: { id: 440, icon: "e3f595a92552da3d664ad00277fad2107345f743" },
  },
]);

export const $gamesTiers = $allGames.map((games) =>
  games.reduce(
    (res, { tier }) => (res.includes(tier) ? res : res.concat(tier)),
    [] as string[]
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
