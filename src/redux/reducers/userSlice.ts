import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../utils/types';

interface userState {
  isLoggedIn?: boolean;
  isCheckingAuth?: boolean;
  accessToken?: string;
  userData?: UserType;
}

const initialState: userState = {
  isLoggedIn: false,
  isCheckingAuth: true,
  accessToken: '',
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserData: (state, action: PayloadAction<Record<string, any>>) => {
      state.userData = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsCheckingAuth: (state, action: PayloadAction<boolean>) => {
      state.isCheckingAuth = action.payload;
    },
    logout: () => initialState,
  },
});

export const {
  setAccessToken,
  setUserData,
  setLoggedIn,
  logout,
  setIsCheckingAuth,
} = userSlice.actions;

export default userSlice.reducer;
