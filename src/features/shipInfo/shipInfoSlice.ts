import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {},
};

export const shipInfoSlice = createSlice({
  name: 'SHIP_INFO',
  initialState,
  reducers: {
    setShipInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { actions: shipInfoSliceAction, reducer: shipInfoSliceReducer } =
  shipInfoSlice;

export default shipInfoSlice;
