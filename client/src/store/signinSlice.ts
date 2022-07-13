import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SignInState {
  KilpAddress: string
  balance: number
}

// Define the initial state using that type
const initialState: SignInState = {
  KilpAddress: '',
  balance: 0,
}

export const signinSlice = createSlice({
  name: 'signin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setKilpAddress: (state, action: PayloadAction<string>) => {
      state.KilpAddress = action.payload
    },
    setbalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload
    },
  },
})

export const signinActions = { ...signinSlice.actions }
