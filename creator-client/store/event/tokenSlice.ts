import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenType } from '../../types/event';

// Define a type for the slice state
interface TokenState {
  type: TokenType;
}

// Define the initial state using that type
const initialState: TokenState = {
  type: 'nft',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    set_type: (state, action: PayloadAction<TokenType>) => {
      state.type = action.payload;
    },
  },
});

export const tokenActions = { ...tokenSlice.actions };
