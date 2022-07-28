import * as mongoose from 'mongoose';

export const LikedEventSchema = new mongoose.Schema({
  event_id: { type: Number, required: true },
  address: { type: String, required: true },
});

export interface LikedEvent {
  event_id: number;
  address: string;
}
