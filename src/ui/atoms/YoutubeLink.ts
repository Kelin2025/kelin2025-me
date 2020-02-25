import { css } from "~lib/styled";
import { SpecData } from "~lib/spec";

import { Link } from "./Button";

css`
  [data-youtube-link] {
    background: #c4302b;
  }
`;

export const YoutubeLink = ({ text, href }, specOptions?: SpecData) => {
  Link({ text, href, target: "_blank" }, [
    specOptions,
    { data: { youtubeLink: true } }
  ]);
};
