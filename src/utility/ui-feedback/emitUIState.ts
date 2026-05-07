import { showUIFeedback } from '~/redux/reducers/uiFeedbackSlice';
import { store } from '~/redux/store';
import {
  registerAction,
  removeActionFromRegistry,
} from '~/utils/actionRegistry';
import { UIFeedbackVariantType } from '~/utils/types';

type LoadingOptions<T = any> = {
  type?: UIFeedbackVariantType;
  message?: string;
  actionLabel?: string;
  onAction?: (payload: T) => Promise<void> | void;
  actionPayload?: T;
  dismissable?: boolean;
};

export const emitUIState = <T = any>({
  type = 'loading',
  message,
  actionLabel,
  onAction,
  actionPayload,
  dismissable = true,
}: LoadingOptions<T>) => {
  let actionId: string | undefined;

  if (onAction && actionLabel) {
    actionId = `loading_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    registerAction(actionId, async () => {
      try {
        await onAction(actionPayload as T);
      } finally {
        removeActionFromRegistry(actionId!);
      }
    });
  }

  store.dispatch(
    showUIFeedback({
      type,
      message,
      actionLabel,
      actionId,
      dismissable,
    }),
  );
};
