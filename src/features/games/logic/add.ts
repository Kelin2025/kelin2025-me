import { createStore, combine, createEvent, sample } from "effector";

export const titleChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();
export const ratingChanged = createEvent<string>();
export const hoursChanged = createEvent<string>();
export const reviewChanged = createEvent<string>();
export const prosChanged = createEvent<string[]>();
export const consChanged = createEvent<string[]>();
export const genreChanged = createEvent<string>();
export const difficultyChanged = createEvent<string>();
export const tagChanged = createEvent<string>();
export const savePressed = createEvent();

export const $title = createStore<string>("");
export const $description = createStore<string>("");
export const $rating = createStore<string>("");
export const $hours = createStore<string>("");
export const $review = createStore<string>("");
export const $pros = createStore<string[]>([]);
export const $cons = createStore<string[]>([]);
export const $genre = createStore<string>("");
export const $difficulty = createStore<string>("");
export const $tag = createStore<string>("");

export const $formData = combine({
  title: $title,
  description: $description,
  rating: $rating,
  hours: $hours,
  links: combine({ review: $review }),
  pros: $pros,
  cons: $cons,
  tags: combine([
    $genre.map((value) => ({ type: "genre", value })),
    $tag.map((value) => ({ type: "tag", value })),
    $difficulty.map((value) => ({ type: "difficulty", value })),
  ]),
});

$title.on(titleChanged, (state, value) => value);

$description.on(descriptionChanged, (state, value) => value);

$hours.on(hoursChanged, (state, value) => value);

$review.on(reviewChanged, (state, value) => value);

$pros.on(prosChanged, (state, value) => value);

$cons.on(consChanged, (state, value) => value);

$genre.on(genreChanged, (state, value) => value);

$difficulty.on(difficultyChanged, (state, value) => value);

$tag.on(tagChanged, (state, value) => value);

$rating.on(ratingChanged, (state, value) => value);

sample($formData, savePressed).watch((game) => {
  let games = [];
  try {
    games = JSON.parse(localStorage.games);
  } catch (err) {}
  games.push(game);
  localStorage.games = JSON.stringify(games);
});
