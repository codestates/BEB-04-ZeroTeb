import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface RegionState {
    region: string
  }
  
  // Define the initial state using that type
  const initialState: RegionState = {
    region: '전국',
  }
  
  export const regionSlice = createSlice({
    name: 'region',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      setRegion: (state, action: PayloadAction<string>) => {
        state.region = action.payload
      },
    },
  })
  
  export const regionActions = { ...regionSlice.actions }