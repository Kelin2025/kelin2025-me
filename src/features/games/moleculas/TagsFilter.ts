import { list, remap } from "effector-dom";
import { eventWithData } from "@/lib/dom-utils";

import { Tag } from "@/api/challenges";
import { $tagsList } from "@/api/games";
import { tagToggled } from "../logic/search";

import { ColumnGrid, PageSubtitle, Checkbox, Grid } from "@/ui";

type FiltersList = {
  title: string;
  filter: (tag: Tag) => boolean;
};

const FiltersList = ({ title, filter }: FiltersList) => {
  const $filteredTags = $tagsList.map(tags => tags.filter(filter));
  PageSubtitle(title);
  Grid({ cols: 2 }, () => {
    list($filteredTags, ({ store }) => {
      Checkbox({
        value: remap(store, "value"),
        label: remap(store, "value"),
        change: eventWithData(remap(store, "value"), tagToggled)
      });
    });
  });
};

export const TagsFilter = () => {
  ColumnGrid(() => {
    FiltersList({ title: "Жанры", filter: tag => tag.type === "genre" });
    FiltersList({ title: "Вид игры", filter: tag => tag.type === "view" });
    // FiltersList({
    //   title: "Сложность",
    //   filter: tag => tag.type === "difficulty"
    // });
  });
};
