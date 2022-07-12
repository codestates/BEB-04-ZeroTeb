import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  event_id: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  thumnail: { type: String, required: true },
  token_image_url: { type: String, required: true },
  price: { type: [], required: true },
  contents: { type: String, required: true },
  option: { type: String },
  recruit_start_date: { type: String, required: true },
  recruit_end_date: { type: String, required: true },
  event_start_date: { type: String, required: true },
  event_end_date: { type: String, required: true },
  created_date: { type: String, required: true },
  modified_date: { type: String },
});

export interface Event {
  event_id: string;
  title: string;
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
}
