import { using } from "effector-dom";

import "./features";

import { Layout } from "@/features/layout";
import { HomePage } from "@/pages/Home";
import { GamesPage } from "@/pages/Games";
import { ContestPage } from "@/pages/Contest";
import { ChallengesPage } from "@/pages/Challenges";
import { Results1Page } from "@/pages/Results1";
import { Results2Page } from "@/pages/Results2";
import { Results3Page } from "@/pages/Results3";

import "@/ui/assets/css/reset.css";

const routes = [
  HomePage,
  GamesPage,
  ChallengesPage,
  ContestPage,
  Results1Page,
  Results2Page,
  Results3Page
];

using(document.getElementById("app"), () => {
  Layout(routes);
});
