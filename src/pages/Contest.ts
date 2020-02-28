import { h } from "effector-dom";

import icon from "~ui/assets/icons/winner.svg";
import { GiveawayForm } from "~features/giveaway";
import { ContactsCards } from "~features/contacts";
import { PageTitle, PageDescription, ColumnGrid, PageSubtitle } from "~ui";

const title = "Розыгрыш Ori";
const link = "/giveaway";
const meta = { icon, width: 800 };

const view = () => {
  PageTitle("Тот Самый Розыгрыш");
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
    h("p", {
      text:
        "Победитель получит Steam-версию игры Ori and the Will of the Wisps. Учтите, что я не смогу подарить вам игру, если вы находитесь не в СНГ/в Украине"
    });
    h("p", {
      text:
        "Розыгрыш будет проведен в день релиза Ori в прямом эфире (либо на следующий день, если выйдет поздно по московскому времени)"
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
