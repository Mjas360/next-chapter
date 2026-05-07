import { showSnackbar } from '~/redux/reducers/snackbarSlice';
import { store } from '~/redux/store';
import {
  registerAction,
  removeActionFromRegistry,
} from '~/utils/actionRegistry';
import { SnackbarVariantType } from '~/utils/types';

type SnackbarOptions<T = any> = {
  type?: SnackbarVariantType;
  message: string;
  actionLabel?: string;
  onAction?: (payload: T) => Promise<void> | void;
  actionPayload?: T;
  duration?: number;
};

export const emitSnackbar = <T = any>({
  type = 'default',
  message,
  actionLabel,
  onAction,
  actionPayload,
  duration,
}: SnackbarOptions<T>) => {
  let actionId: string | undefined;

  if (onAction && actionLabel) {
    actionId = `snackbar_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    registerAction(actionId, async () => {
      try {
        await onAction(actionPayload as T);
      } finally {
        // auto cleanup after execution
        removeActionFromRegistry(actionId!);
      }
    });
  }

  store.dispatch(
    showSnackbar({
      type,
      message,
      actionLabel,
      actionId,
      duration,
    }),
  );
};
