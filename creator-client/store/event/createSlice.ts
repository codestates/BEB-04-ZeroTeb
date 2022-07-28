import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateEventType, EventCategory, EventClassType } from '../../types/event';

// Define a type for the slice state
interface CreateState extends CreateEventType {}

// Define the initial state using that type
const initialState: CreateState = {
  title: '',
  address: '',
  promoter: '',
  location: '',
  sub_location: '',
  category: 'concert',
  type: 'sale',
  thumnail: '',
  token_image_url: '',
  price: [
    {
      class: 0,
      price: 0,
      count: 1,
    },
  ],
  contents: '',
  option: [],
  recruit_start_date: Number(Date.now().toString().substring(0, 10)),
  recruit_end_date: Number((Date.now() + 1).toString().substring(0, 10)),
  event_start_date: Number((Date.now() + 2).toString().substring(0, 10)),
  event_end_date: Number((Date.now() + 3).toString().substring(0, 10)),
  created_date: 0,
  modified_date: 0,
};

export const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    set_title: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    set_address: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    set_promoter: (state, action: PayloadAction<string>) => {
      state.promoter = action.payload;
    },
    set_location: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    set_sub_location: (state, action: PayloadAction<string>) => {
      state.sub_location = action.payload;
    },
    set_category: (state, action: PayloadAction<EventCategory>) => {
      state.category = action.payload;
    },
    set_type: (state, action: PayloadAction<'entry' | 'sale'>) => {
      state.type = action.payload;
    },
    set_thumnail: (state, action: PayloadAction<string>) => {
      state.thumnail = action.payload;
    },
    set_token_image_url: (state, action: PayloadAction<string>) => {
      state.token_image_url = action.payload;
    },
    set_price: (state, action: PayloadAction<EventClassType[]>) => {
      state.price = action.payload;
    },
    set_contents: (state, action: PayloadAction<string>) => {
      state.contents = action.payload;
    },
    set_option: (state, action: PayloadAction<object[]>) => {
      state.option = action.payload;
    },
    set_recruit_start_date: (state, action: PayloadAction<number>) => {
      state.recruit_start_date = action.payload;
    },
    set_recruit_end_date: (state, action: PayloadAction<number>) => {
      state.recruit_end_date = action.payload;
    },
    set_event_start_date: (state, action: PayloadAction<number>) => {
      state.event_start_date = action.payload;
    },
    set_event_end_date: (state, action: PayloadAction<number>) => {
      state.event_end_date = action.payload;
    },
    set_created_date: (state, action: PayloadAction<number>) => {
      state.created_date = action.payload;
    },
    set_modified_date: (state, action: PayloadAction<number>) => {
      state.modified_date = action.payload;
    },
    clear: (state, action: PayloadAction<void>) => {
      state = initialState;
    },
  },
});

export const createEventActions = { ...createEventSlice.actions };
