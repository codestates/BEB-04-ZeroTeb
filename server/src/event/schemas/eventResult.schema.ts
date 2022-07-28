import * as mongoose from 'mongoose';

export const EventResultSchema = new mongoose.Schema({
  event_id: { type: Number, unique: true, required: true },
  address: { type: String, required: true },
});

export interface EventResult {
  event_id: number;
  address: string;
}
