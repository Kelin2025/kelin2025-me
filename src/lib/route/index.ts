import { createStore, createEvent, combine, restore } from "effector";

export type Route = {
  title: string;
  link: string;
  view: Function;
  meta: { icon?: string; width?: number };
};

export const openTab = createEvent<string>();
export const routeChanged = createEvent<string>();
export const routeInitialized = createEvent<{ route: string; hash: string }>();

export const $currentRoute = createStore<string>(location.pathname);
export const $currentHash = createStore<string>(
  location.hash ? location.hash.slice(1) : ""
);
export const $currentPathInfo = combine({
  route: $currentRoute,
  hash: $currentHash
});
export const $currentPath = $currentPathInfo.map(
  ({ route, hash }) => `${route}#${hash}`
);
export const $firstRoute = restore(routeInitialized, {
  route: null,
  hash: null
});

$currentRoute.on(routeChanged, (state, route) => route.split("#")[0]);

$currentHash.on(routeChanged, (state, route) =>
  decodeURIComponent(route.split("#")[1] || "")
);

openTab.watch(link => {
  window.open(link, "_blank");
});

routeChanged.watch(route => {
  history.pushState(null, null, route);
});

routeInitialized($currentPathInfo.getState());
