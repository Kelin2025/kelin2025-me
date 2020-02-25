import { css } from "~lib/styled";
import { list, h, remap, spec } from "effector-dom";

import { $challengesList } from "~api/challenges";

import { ChallengeCard } from "~ui";

css`
  [data-challenges] {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
  }

  [data-challenges] > img {
    grid-area: icon;
  }

  [data-challenges] > h2 {
    grid-area: title;
  }

  [data-challenges] > p {
    grid-area: description;
  }
`;

export const Challenges = () => {
  h("div", () => {
    spec({ data: { challenges: true } });
    list($challengesList, ({ store }) => {
      ChallengeCard({
        title: remap(store, "title"),
        description: remap(store, "description"),
        icon: remap(store, "icon"),
        video: remap(store, "video")
      });
    });
  });
};
