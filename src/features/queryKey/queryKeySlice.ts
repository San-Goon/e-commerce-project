import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StatesType {
  reviewQueryKey?: [string, number];
  orderQueryKey?: [string, number];
}

const initialState: StatesType = {
  reviewQueryKey: undefined,
  orderQueryKey: undefined,
};

export const queryKeySlice = createSlice({
  name: 'QUERY_KEY',
  initialState,
  reducers: {
    setReviewQueryKey: (state, action: PayloadAction<[string, number]>) => {
      state.reviewQueryKey = action.payload;
    },
    setOrderQueryKey: (state, action: PayloadAction<[string, number]>) => {
      state.orderQueryKey = action.payload;
    },
  },
});

export const { actions: queryKeySliceActions, reducer: queryKerySliceReducer } =
  queryKeySlice;

export default queryKeySlice;
