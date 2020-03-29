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

export const SteamStats = model<ISteamStats>("SteamStat", SteamStatsSchema);
