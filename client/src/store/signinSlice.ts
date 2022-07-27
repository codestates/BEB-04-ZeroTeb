import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignInState {
  KilpAddress: string
  balance: number
  AccessToken: string
  userName: string
}

const initialState: SignInState = {
  KilpAddress: '',
  balance: 0,
  AccessToken: '',
  userName: '',
}

export const signinSlice = createSlice({
  name: 'signin',
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
    setUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
  },
})

export const signinActions = { ...signinSlice.actions }
