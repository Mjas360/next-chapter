import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import snackbarReducer from './reducers/snackbarSlice';
import uiFeedbackSlice from './reducers/uiFeedbackSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    snackbarReducer,
    uiFeedbackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
