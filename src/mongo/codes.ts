import { Schema, model, Document } from "mongoose";

interface ICode extends Document {
  codes: string[];
}

const CodeSchema = new Schema({
  codes: [String]
});

export const CodeModel = model<ICode>("Code", CodeSchema);
