import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileType } from '../types/common';

// Define a type for the slice state
interface CommonState {
  event_image: FileType;
  token_image: FileType;
}

// Define the initial state using that type
const initialState: CommonState = {
  event_image: {
    url: '',
  },
  token_image: {
    url: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    set_event_image: (state, action: PayloadAction<FileType>) => {
      state.event_image = action.payload;
    },
    set_token_image: (state, action: PayloadAction<FileType>) => {
      state.token_image = action.payload;
    },
  },
});

export const commonActions = { ...commonSlice.actions };
