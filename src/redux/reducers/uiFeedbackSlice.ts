import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIFeedbackVariantType } from '~/utils/types';

type UIFeedbackState = {
  visible?: boolean;
  type: UIFeedbackVariantType;
  message?: string;
  actionLabel?: string;
  actionId?: string;
  dismissable?: boolean;
};

const initialState: UIFeedbackState = {
  visible: false,
  type: 'loading',
};

const uiFeedbackSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showUIFeedback: (_, action: PayloadAction<UIFeedbackState>) => ({
      ...action.payload,
      visible: true,
    }),

    hideUIFeedback: state => {
      state.visible = false;
    },
  },
});

export const { showUIFeedback, hideUIFeedback } = uiFeedbackSlice.actions;
export default uiFeedbackSlice.reducer;
