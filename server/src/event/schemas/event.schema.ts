import * as mongoose from 'mongoose';

const now = new Date();
const start_date = now.toLocaleString();
now.setDate(now.getDate() + 5);
const end_date = now.toLocaleString();

export const EventSchema = new mongoose.Schema({
  event_id: { type: Number, default: 0, unique: true },
  title: { type: String, required: true },
  promoter: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  thumnail: { type: String, required: true },
  token_image_url: { type: String, required: true },
  price: { type: [], required: true },
  contents: { type: String, required: true },
  option: { type: [] },
  recruit_start_date: { type: String, default: start_date },
  recruit_end_date: { type: String, default: end_date },
  event_start_date: { type: String, default: start_date },
  event_end_date: { type: String, default: end_date },
  created_date: { type: String, default: start_date },
  modified_date: { type: String, default: start_date },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  status: { type: String, required: true },
});

export interface Event {
  event_id: number;
  title: string;
  promoter: string;
  address: string;
  location: string;
  category: string;
  type: string;
  thumnail: string;
  token_image_url: string;
  price: [];
  contents: string;
  option: [];
  recruit_start_date: string;
  recruit_end_date: string;
  event_start_date: string;
  event_end_date: string;
  created_date: string;
  modified_date: string;
  x: number;
  y: number;
  status: string;
}
