import modalSlice from '@features/modal/modalSlice';
import shipInfoSlice from '@features/shipInfo/shipInfoSlice';
import userSlice from '@features/user/userSlice';

import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [modalSlice.name]: modalSlice.reducer,
      [shipInfoSlice.name]: shipInfoSlice.reducer,
    },
  });
}

const store = makeStore();

export default store;
