import { using } from "effector-dom";

import "./features";

import { Layout } from "~features/layout";
import { HomePage } from "~pages/Home";
import { GamesPage } from "~pages/Games";
import { ChallengesPage } from "~pages/challenges";

const routes = [HomePage, GamesPage, ChallengesPage];

using(document.getElementById("app"), () => {
  Layout(routes);
});
