import { h } from "effector-dom";

import icon from "~ui/assets/icons/winner.svg";
import { GiveawayForm } from "~features/giveaway";
import { ContactsCards } from "~features/contacts";
import { PageTitle, PageDescription, ColumnGrid, PageSubtitle } from "~ui";

const title = "Розыгрыш";
const link = "/giveaway";
const meta = { icon, width: 800 };

const view = () => {
  PageTitle("Тот самый розыгрыш");
  PageDescription(() => {
    h("p", {
      text:
        "В честь 5000 подписчиков я решил провести розыгрыш. Но не простой, а интерактивный :)"
    });
    h("p", {
      text:
        "Я спрятал 5 секретных фраз на своем YouTube-канале, в Discord'е, на Twitch и на этом сайте"
    });
    h("p", {
      text:
        "Для участия в конкурсе вам необходимо найти их все и ввести ниже. Среди тех, кто угадал все 5, я случайным образом выберу победителя"
    });
  });
  ColumnGrid(() => {
    PageSubtitle("Где предстоит искать");
    ContactsCards();
    PageSubtitle("Я нашел ключи!");
    GiveawayForm();
  });
};

export const ContestPage = { title, link, view, meta };
