import modalSlice from '@features/modal/modalSlice';
import userSlice from '@features/user/userSlice';

import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [modalSlice.name]: modalSlice.reducer,
    },
  });
}

const store = makeStore();

export default store;
