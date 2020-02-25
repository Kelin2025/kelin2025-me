import { h } from "effector-dom";

import icon from "~ui/assets/icons/portfolio.svg";

import { EmailCard, ContactsCards } from "~features/contacts";
import {
  Card,
  List,
  PageTitle,
  PageSubtitle,
  PageDescription,
  ColumnGrid
} from "~ui";

const title = "Обо мне";
const link = "/";
const meta = { icon, width: 800 };

const view = () => {
  PageTitle("Обо мне");
  PageDescription(() => {
    h("p", {
      text: "Меня зовут Антон, в интернетах - Келин (тот самый)."
    });
    h("p", {
      text:
        "На этом сайте вы можете найти необходимую информацию обо мне, список пройденных игр и челленджей и многое другое"
    });
  });
  ColumnGrid(() => {
    PageSubtitle("Во что я играю?");
    Card(() => {
      List({ type: "square" }, [
        "Roguelike / Roguelite",
        "Метроидвании",
        "Платформеры",
        "Shoot them all / beat them up и прочие bullet hell",
        "Слэшеры"
      ]);
    });
    PageSubtitle("Где я обитаю");
    ContactsCards();
    PageSubtitle("Для деловых предложений");
    EmailCard();
  });
};

export const HomePage = { title, link, view, meta };
