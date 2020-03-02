import { h } from "effector-dom";

import icon from "@/ui/assets/icons/gamepad.svg";

import { Games } from "@/features/games";
import { PageTitle, PageDescription } from "@/ui";

const title = "Пройденные игры";
const link = "/games";
const meta = { icon, width: 1200 };

const view = () => {
  PageTitle("Пройденные игры (Beta)");
  PageDescription(() => {
    h("p", {
      text:
        "У меня часто спрашивают о том, играл ли я в такую-то игру и что о ней думаю. Поэтому я решил сделать эту страницу со списком игр и кратким обзором каждой"
    });
    h("p", {
      text:
        "Вы можете воспользоваться формой поиска ниже или просто просмотреть все игры, в которые я играл"
    });
    h("p", {
      text:
        "Так же вы можете скопировать ссылку на игру и поделиться ей с другими"
    });
  });
  Games();
};

export const GamesPage = { title, link, view, meta };
