import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserStateType {
  isLogin: boolean;
  socialToken: string;
}

const initialState: UserStateType = {
  isLogin: false,
  socialToken: '',
};

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setSocialToken: (state, action: PayloadAction<string>) => {
      state.socialToken = action.payload;
    },
    deleteSocialToken: (state) => {
      state.socialToken = '';
    },
  },
});

export const { actions: userSliceActions, reducer: userSliceReducer } =
  userSlice;

export default userSlice;
