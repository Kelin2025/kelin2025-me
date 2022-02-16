import { h } from "forest";

import icon from "@/ui/assets/icons/gamepad.svg";

import { GamesTierList } from "@/features/games-tier-list";
import { PageTitle, PageDescription } from "@/ui";

const title = "Пройденные игры";
const link = "/games";
const meta = { icon, width: 1200 };

const view = () => {
  PageTitle("Пройденные игры (Beta)");
  PageDescription(() => {
    h("p", {
      text: "У меня часто спрашивают о том, играл ли я в такую-то игру и что о ней думаю. Поэтому я решил сделать эту страницу с тирлистом игр и кратким обзором каждой"
    });
    h("p", {
      text: "Кликайте по интересующей вас игре для большей информации"
    });
    h("p", {
      text: "Так же вы можете скопировать ссылку на игру и поделиться ей с другими"
    });
  });
  GamesTierList();
  // Games();
};

export const GamesPage = { title, link, view, meta };
