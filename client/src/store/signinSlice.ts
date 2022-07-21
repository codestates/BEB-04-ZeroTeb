import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SignInState {
  KilpAddress: string
  balance: number
  AccessToken: string
}

// Define the initial state using that type
const initialState: SignInState = {
  KilpAddress: '',
  balance: 0,
  AccessToken: '',
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
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.AccessToken = action.payload
    },
  },
})

export const signinActions = { ...signinSlice.actions }
