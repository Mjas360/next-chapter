import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hydrateCart } from '~/redux/reducers/cartSlice';
import { setIsCheckingAuth } from '~/redux/reducers/userSlice';
import { RootState } from '~/redux/store';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';
import { loadCart } from '~/utils/saveCart';

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
