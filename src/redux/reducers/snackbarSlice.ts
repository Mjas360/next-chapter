import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarVariantType } from '~/utils/types';

type SnackbarState = {
  type: SnackbarVariantType;
  visible?: boolean;
  message: string;
  actionLabel?: string;
  actionId?: string;
  duration?: number;
};

const initialState: SnackbarState = {
  visible: false,
  message: '',
  type: 'default',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (_, action: PayloadAction<SnackbarState>) => ({
      ...action.payload,
      visible: true,
    }),

    hideSnackbar: state => {
      state.visible = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
