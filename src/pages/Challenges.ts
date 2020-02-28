import { h } from "effector-dom";

import icon from "@/ui/assets/icons/medal.svg";

import { Challenges } from "@/features/challenges";
import { PageTitle, PageDescription } from "@/ui";

const title = "Мои Челленджи";
const link = "/challenges";
const meta = { icon, width: 800 };

const view = () => {
  PageTitle("Мои Челленджи");
  PageDescription(() => {
    h("p", {
      text:
        "Я периодически провожу разные челленджи, приурочивая их к каким-либо значимым событиям канала (либо просто так)"
    });
    h("p", {
      text:
        "Здесь вы можете увидеть историю всех проведенных челленджей, а также просмотреть их записи"
    });
  });
  Challenges();
};

export const ChallengesPage = { title, link, view, meta };
