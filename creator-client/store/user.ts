import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  username: string;
  address: string;
  isAuth: boolean;
  errorMessage: string;
}

// Define the initial state using that type
const initialState: UserState = {
  username: '',
  address: '',
  isAuth: false,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set_username: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    set_address: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    set_isAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    set_errorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const userActions = { ...userSlice.actions };
