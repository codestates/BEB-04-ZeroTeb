import * as mongoose from 'mongoose';

export const HoldingSchema = new mongoose.Schema({
  token_id: { type: Number, required: true, unique: true },
  event_id: { type: Number, required: true },
  address: { type: String, required: true },
  number: { type: Number, require: true },
});

export interface HoldingType {
  address: string;
  token_id: number;
  event_id: number;
  number: number;
}
