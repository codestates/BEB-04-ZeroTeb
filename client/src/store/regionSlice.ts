import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RegionState {
  region: string
}

const initialState: RegionState = {
  region: '전국',
}

export const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload
    },
  },
})

export const regionActions = { ...regionSlice.actions }
