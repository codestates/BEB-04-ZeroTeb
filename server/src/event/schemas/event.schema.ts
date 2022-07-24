import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  event_id: { type: Number, default: 0, unique: true },
  title: { type: String, required: true },
  promoter: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  sub_location: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  thumnail: { type: String, required: true },
  token_image_url: { type: String, required: true },
  price: { type: [], required: true },
  contents: { type: String, required: true },
  option: { type: [] },
  recruit_start_date: { type: Number, required: true },
  recruit_end_date: { type: Number, required: true },
  event_start_date: { type: Number, required: true },
  event_end_date: { type: Number, required: true },
  created_date: { type: Number, required: true },
  modified_date: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  status: { type: String, default: '시작 전' },
  remaining: { type: Number, required: true },
  banner: { type: Boolean, default: false },
  totalSeat: { type: Number, required: true },
});

export interface Event {
  event_id: number;
  title: string;
  promoter: string;
  address: string;
  location: string;
  sub_location: string;
  category: string;
  type: string;
  thumnail: string;
  token_image_url: string;
  price: [];
  contents: string;
  option: [];
  recruit_start_date: number;
  recruit_end_date: number;
  event_start_date: number;
  event_end_date: number;
  created_date: number;
  modified_date: number;
  x: number;
  y: number;
  status: string;
  remaining: number;
  banner: boolean;
  totalSeat: number;
}
