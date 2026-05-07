import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCheckingAuth } from '~/redux/reducers/userSlice';
import { RootState } from '~/redux/store';
import { emitSnackbar } from '~/utility/snackbar/emitSnackbar';

export const useCheckAuthSession = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.userReducer);

  const loadSession = async () => {
    try {
      await new Promise((resolve: any) => setTimeout(resolve, 3000));
      
      if (isLoggedIn) return;

      // get fresh userdata
      // 
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
    })();
  }, []);
};
