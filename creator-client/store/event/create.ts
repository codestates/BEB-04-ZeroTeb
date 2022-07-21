import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateEventType, EventClassType } from '../../types/event';

// Define a type for the slice state
interface CreateState extends CreateEventType {}

// Define the initial state using that type
const initialState: CreateState = {
  title: '',
  address: '',
  promoter: '',
  location: '',
  category: '',
  type: 'entry',
  thumnail: '',
  token_image_url: '',
  price: [],
  contents: '',
  option: [],
  recruit_start_date: 0,
  recruit_end_date: 0,
  event_start_date: 0,
  event_end_date: 0,
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
    set_category: (state, action: PayloadAction<string>) => {
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
  },
});

export const createEventActions = { ...createEventSlice.actions };
