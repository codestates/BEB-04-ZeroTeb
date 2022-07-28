import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface KlipState {
  requestKey: string;
  klaytnAddress: string;
  status: string;
}

// Define the initial state using that type
const initialState: KlipState = {
  requestKey: '',
  klaytnAddress: '',
  status: 'prepared',
};

export const klipSlice = createSlice({
  name: 'klip',
  initialState,
  reducers: {
    set_requestKey: (state, action: PayloadAction<string>) => {
      state.requestKey = action.payload;
    },
    set_klaytnAddress: (state, action: PayloadAction<string>) => {
      state.klaytnAddress = action.payload;
    },
    set_status: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const klipActions = { ...klipSlice.actions };
