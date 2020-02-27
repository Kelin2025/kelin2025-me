import { Schema, model, Document } from "mongoose";

interface IRecord extends Document {
  contact: string;
  answers: boolean;
  uid: string;
}

const RecordSchema = new Schema({
  contact: String,
  answers: [Boolean],
  uid: {
    type: String,
    index: true,
    unique: true
  }
});

export const RecordModel = model<IRecord>("GiveawayRecord", RecordSchema);
