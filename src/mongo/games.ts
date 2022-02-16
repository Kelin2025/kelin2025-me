import { Schema, model, Document } from "mongoose";

export interface IGame {
  appid: number;
  name: string;
  tier: "S" | "A" | "B" | "C" | "D" | "E" | "Meme";
  review: string;
  video: null | String;
  steam: {
    about: string;
    icon: string;
    logo: string;
  };
}

/*
CREATE TABLE Games
(
  appid uint64,
  name utf8,
  tier utf8,
  review utf8,
  video utf8?,
  PRIMARY KEY (appid)
);

CREATE TABLE SteamGames
(
  appid uint64,
  about utf8,
  icon utf8?,
  logo utf8?,
  PRIMARY KEY (appid)
);

*/

const GameSchema = new Schema({
  appid: {
    type: Number,
    unique: true,
    index: true
  },
  name: String,
  tier: {
    type: String,
    enum: ["S", "A", "B", "C", "D", "E", "Meme"]
  },
  review: String,
  video: String,
  steam: {
    about: String,
    icon: String,
    logo: String
  }
});

export const GameModel = model<IGame & Document>("Game", GameSchema);
