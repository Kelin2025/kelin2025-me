import { using } from "forest";

import "virtual:svg-icons-register";

import "./features";

import { Layout } from "@/features/layout";
import { HomePage } from "@/pages/Home";
import { GamesPage } from "@/pages/Games";
import { ChallengesPage } from "@/pages/Challenges";

import "@/ui/assets/css/reset.css";

const routes = [HomePage, GamesPage, ChallengesPage];

using(document.getElementById("app"), () => {
  Layout(routes);
});
