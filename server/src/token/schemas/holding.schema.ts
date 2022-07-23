import * as mongoose from 'mongoose';

export const HoldingSchema = new mongoose.Schema({
  address: { type: String, required: true },
  token_id: { type: Number, required: true },
});

export interface Holding {
  address: string;
  token_id: number;
}
