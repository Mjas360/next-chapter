import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hydrateCart } from '~/redux/reducers/cartSlice';
import { setIsCheckingAuth } from '~/redux/reducers/userSlice';
import { RootState } from '~/redux/store';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';
import { loadCart } from '~/utils/saveCart';
import { ON_BOARDING_STORAGE_KEY } from '~/app-stack/book-preference/BookPreference';
import { screenNames } from '~/utils/screenNames';
import { navigate } from '~/services/navigationService';

export const useCheckAuthSession = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.userReducer);

  const loadCartItems = async () => {
    const items = await loadCart();

    if (items.length > 0) {
      dispatch(hydrateCart(items));
    }
  };

  const loadSession = async () => {
    try {
      await new Promise((resolve: any) => setTimeout(resolve, 3000));

      const isOnboardingCompleted = JSON.parse(
        (await AsyncStorage.getItem(ON_BOARDING_STORAGE_KEY)) || 'false',
      ); // Replace with actual logic to check if onboarding is completed

      if (isOnboardingCompleted) {
        navigate(screenNames.APP_TAB_STACK, {
          screen: screenNames.HOME,
        });
      }

      if (isLoggedIn) return;

      // TODO: get new refresh token from backend and update redux state
      // Get user data
    } catch (error: Error | any) {
      emitSnackbar({
        type: 'error',
        message: error?.message,
      });
    } finally {
      dispatch(setIsCheckingAuth(false));
    }
  };

  useEffect(() => {
    (async () => {
      await loadSession();
      await loadCartItems();
    })();
  }, []);
};
