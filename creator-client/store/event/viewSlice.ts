import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventInfoType } from '../../types/event';

// Define a type for the slice state
interface EventInfoState {
  data: EventInfoType[];
}

// Define the initial state using that type
const initialState: EventInfoState = {
  data: [],
};

export const eventInfoSlice = createSlice({
  name: 'eventInfo',
  initialState,
  reducers: {
    seteventInfo: (state, action: PayloadAction<EventInfoType[]>) => {
      const payload = action.payload.map((eventInfo: any) => {
        delete eventInfo._id;
        delete eventInfo.__v;
        eventInfo.thumnail = eventInfo.thumnail.replace('http://server.beeimp.com:18080', '/api');
        eventInfo.token_image_url = eventInfo.token_image_url.replace(
          'http://server.beeimp.com:18080',
          '/api'
        );
        return eventInfo;
      });
      state.data = payload;
    },
  },
});

export const eventInfoActions = { ...eventInfoSlice.actions };
