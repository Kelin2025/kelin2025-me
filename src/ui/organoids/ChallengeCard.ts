import { css } from "~lib/styled";

import { Card } from "./Card";

import { h, spec } from "effector-dom";
import { YoutubeLink } from "~ui/atoms/YoutubeLink";
import { toStore, specCb, SpecData } from "~lib/spec";
import { onlyOn } from "~ui/logic/screen";

css`
  [data-challenge-card] {
    align-items: center;
    display: grid;
    grid-gap: 0 15px;
    grid-template-areas: "icon title controls" "icon description controls";
    grid-template-columns: max-content 1fr max-content;
  }

  [data-challenge-card] > [data-icon] {
    border-radius: 10px;
    grid-area: icon;
    background: rgba(0, 0, 0, 0.1);
    height: 60px;
    width: 60px;
  }

  [data-challenge-card] > [data-icon] > img {
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }

  [data-challenge-card] > h2 {
    grid-area: title;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  [data-challenge-card] > p {
    font-size: 14px;
    grid-area: description;
    margin: 0;
    color: #a6a6a6;
  }

  [data-challenge-card] > [data-controls] {
    grid-area: controls;
  }

  [data-device="phone"] [data-challenge-card] {
    grid-template-areas: "title" "description" "controls";
    grid-gap: 10px;
    grid-template-columns: 1fr;
  }

  [data-device="phone"] [data-challenge-card] > h2 {
    font-size: 20px;
  }

  [data-device="phone"] [data-challenge-view-more] {
    width: 100%;
  }
`;

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
