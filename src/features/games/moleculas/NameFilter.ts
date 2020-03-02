import { $searchInput, searchInputChanged } from "../logic/search";

import { ColumnGrid, PageSubtitle, Input } from "@/ui";

export const NameFilter = () => {
  ColumnGrid(() => {
    PageSubtitle("Моя коллекция");
    Input(
      { value: $searchInput, change: searchInputChanged },
      {
        attr: { placeholder: "Поиск по названию..." }
      }
    );
  });
};
