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
        "На кону 3 Steam-версии игры Ori and the Will of the Wisps. Учтите, что я не смогу подарить вам игру, если вы находитесь не в СНГ/в Украине"
    });
    h("p", {
      text:
        "Для участия в конкурсе вам нужно найти 5 кодовых слов, которые я спрятал на своем YouTube-канале, в Discord'е, на Twitch и на этом сайте"
    });
    h("p", {
      text:
        "Первую копию игры я разыграю среди тех, кто нашел хотя бы один ключ"
    });
    h("p", {
      text:
        "Вторая копия игры будет разыграна среди тех, кто нашел все пять ключей"
    });
    h("p", {
      text:
        "Третья копия игры достанется кому-то из спонсоров YouTube-канала и платных подписчиков на Twitch"
    });
    h("p", {
      text:
        "Розыгрыш будет проведен в день релиза Ori в прямом эфире (либо на следующий день, если выйдет поздно по московскому времени), то есть 11 или 12 Марта"
    });
    h("p", {
      text:
        "Поскольку это будний день, то стрим будет в вечернее время (~18-20 часов по МСК). Я знаю, что я не умею планировать, так что обо всех изменениях следите за дискордом или сообществом на YouTube"
    });
    h("p", {
      text: "Желаю удачи!"
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
