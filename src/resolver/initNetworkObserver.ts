import NetInfo from '@react-native-community/netinfo';
import { t } from 'i18next';
import { hideSnackbar } from '~/redux/reducers/snackbarSlice';
import { store } from '~/redux/store';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';

let lastIsConnected: boolean | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const DEBOUNCE_MS = 1000;

export const initNetworkObserver = () => {
  return NetInfo.addEventListener(state => {
    const isConnected =
      state.isConnected === true && state.isInternetReachable === true;

    // clear previous debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      // initialize baseline
      if (lastIsConnected === null) {
        lastIsConnected = isConnected;
        return;
      }

      // OFFLINE transition
      if (lastIsConnected === true && isConnected === false) {
        emitSnackbar({
          type: 'error',
          message: t('You’re offline. Check your internet connection.'),
          duration: 80000, // 80s
        });

        lastIsConnected = isConnected;
        return;
      }

      // ONLINE transition
      if (lastIsConnected === false && isConnected === true) {
        store.dispatch(hideSnackbar());
        // emitSnackbar({
        //   type: 'success',
        //   message: t('Back online'),
        // });

        lastIsConnected = isConnected;
        return;
      }

      lastIsConnected = isConnected;
    }, DEBOUNCE_MS);
  });
};
