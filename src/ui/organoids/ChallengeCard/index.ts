import { Card } from "../Card";

import { h, spec } from "forest";
import { YoutubeLink } from "@/ui/atoms/YoutubeLink";
import { toStore, specCb, SpecData } from "@/lib/spec";
import { onlyOn } from "@/ui/logic/screen";

import "./index.css";

export const ChallengeCard = (
  { title, icon, description, video },
  specs?: SpecData
) => {
  Card(() => {
    spec({ data: { challengeCard: true } });
    h("h2", { text: title });
    h("p", { text: description });
    h("div", () => {
      onlyOn("desktop");
      spec({ data: { icon: true } });
      h("img", { attr: { src: icon } });
    });
    h("div", () => {
      spec({ data: { controls: true } });
      YoutubeLink(
        { text: "Видео", href: video },
        {
          data: {
            challengeViewMore: true,
            visible: toStore(video).map(Boolean)
          }
        }
      );
    });
    specCb(specs);
  });
};
