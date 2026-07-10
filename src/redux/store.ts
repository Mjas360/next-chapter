import { configureStore } from '@reduxjs/toolkit';
import { cartMiddleware } from './middleware/cartMiddleware';
import cartReducer from './reducers/cartSlice';
import snackbarReducer from './reducers/snackbarSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    snackbarReducer,
    cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cartMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
