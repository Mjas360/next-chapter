import { XIcon } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '~/redux/reducers/snackbarSlice';
import { RootState } from '~/redux/store';
import {
  removeActionFromRegistry,
  runActionFromRegistry,
} from '~/utils/actionRegistry';

const DEFAULT_DURATION = 4000; // 4 seconds

const STATUS_COLORS = {
  success: '#2E7D32',
  error: '#ae2323',
  warning: '#d76101',
  info: '#1565C0',
  default: '',
};

export const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { visible, message, actionLabel, actionId, duration, type } =
    useSelector((state: RootState) => state.snackbarReducer);

  const actionRef = React.useRef(actionId);

  React.useEffect(() => {
    actionRef.current = actionId;
  }, [actionId]);

  const onDismiss = () => {
    dispatch(hideSnackbar());

    if (actionRef.current) {
      removeActionFromRegistry(actionRef.current);
    }
  };

  const handleAction = async () => {
    if (actionId) {
      await runActionFromRegistry(actionId, {}); // payload optional
    }
    onDismiss();
  };

  const snackstyle = useMemo(() => {
    return STATUS_COLORS[type] ? { backgroundColor: STATUS_COLORS[type] } : {};
  }, [type]);

  if (!visible) return null;

  return (
    <Portal>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={duration ?? DEFAULT_DURATION}
        style={snackstyle}
        onIconPress={!actionLabel ? onDismiss : undefined}
        icon={({ size, color }) => (
          <XIcon size={size * 0.8} color={color} weight="bold" />
        )}
        action={
          actionLabel
            ? {
                label: actionLabel,
                onPress: handleAction,
              }
            : undefined
        }
      >
        {message}
      </Snackbar>
    </Portal>
  );
};

// Example usage:
// dispatch(
//   showSnackbar({
//     message: 'Item deleted',
//     actionLabel: 'Undo',
//     actionId: 'UNDO_DELETE_ITEM',
//   })
// );
