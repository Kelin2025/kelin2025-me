import { SpecData } from "@/lib/spec";

import { Link } from "../Button";

import "./index.css";

export const YoutubeLink = ({ text, href }, specOptions?: SpecData) => {
  Link({ text, href, target: "_blank" }, [
    specOptions,
    { data: { youtubeLink: true } }
  ]);
};
