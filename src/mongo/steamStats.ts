import { Schema, model, Document } from "mongoose";

interface ISteamStats extends Document {
  app_id: string;
  clicks: number;
}

const SteamStatsSchema = new Schema({
  app_id: String,
  clicks: {
    type: Number,
    default: 0
  }
});

/*

CREATE TABLE SteamStats (
  appid: uint64,
  clicks: uint64,
  PRIMARY KEY (appid)
);

*/

export const SteamStats = model<ISteamStats>("SteamStat", SteamStatsSchema);
