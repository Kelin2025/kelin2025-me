import {
  $title,
  $hours,
  $genre,
  $difficulty,
  $description,
  $tag,
  $pros,
  $cons,
  titleChanged,
  hoursChanged,
  genreChanged,
  difficultyChanged,
  descriptionChanged,
  tagChanged,
  savePressed,
  prosChanged,
  consChanged,
  $rating,
  ratingChanged
} from "../logic/add";

import { Modal, Label, Input, Button, CardTitle, ColumnGrid, Grid } from "@/ui";
import { forward } from "effector";
import { spec } from "forest";

export const AddGameModal = () => {
  const modal = Modal({
    title: () => {
      CardTitle("Новая Игра");
    },
    child: () => {
      spec({ styleVar: { width: `1000px` } });
      ColumnGrid(() => {
        Grid({ cols: "1fr 100px 100px" }, () => {
          Label("Название", () => {
            Input({ value: $title, change: titleChanged });
          });
          Label("Часы", () => {
            Input({ value: $hours, change: hoursChanged });
          });
          Label("X/10", () => {
            Input({ value: $rating, change: ratingChanged });
          });
        });
        Grid({ cols: "1fr 1fr 1fr" }, () => {
          Label("Жанр", () => {
            Input({ value: $genre, change: genreChanged });
          });
          Label("Вид", () => {
            Input({ value: $tag, change: tagChanged });
          });
          Label("Сложность", () => {
            Input({ value: $difficulty, change: difficultyChanged });
          });
        });
        Grid({ cols: "1fr 1fr" }, () => {
          Label("Плюсы", () => {
            Input({
              value: $pros.map(val => val.join("\n")),
              change: prosChanged.prepend(str => str.split("\n")),
              multiline: true
            });
          });
          Label("Минусы", () => {
            Input({
              value: $cons.map(val => val.join("\n")),
              change: consChanged.prepend(str => str.split("\n")),
              multiline: true
            });
          });
        });
        Label("Отзыв", () => {
          Input({
            value: $description,
            change: descriptionChanged,
            multiline: true
          });
        });
        Button({ type: "primary", text: "Сохранить", click: savePressed });
      });
    }
  });

  forward({ from: savePressed, to: modal.close });

  return modal;
};
