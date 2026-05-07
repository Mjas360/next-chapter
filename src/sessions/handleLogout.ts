import { logout } from '~/redux/reducers/userSlice';
import { store } from '~/redux/store';
import { removeSecureKey } from '~/services/secureKeychain';

export const clearAuthSession = async () => {
  store.dispatch(logout());
  await removeSecureKey('access_token');
  await removeSecureKey('refresh_token');
};
