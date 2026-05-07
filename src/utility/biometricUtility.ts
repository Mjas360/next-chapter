import { getAsyncStoreItem, setAsyncStoreItem } from '~/services/asyncStorage';

const BIOMETRIC_KEY = 'biometric_enabled';

export const setBiometricEnabled = async (enabled: boolean) => {
  await setAsyncStoreItem(BIOMETRIC_KEY, String(enabled));
};

export const isBiometricEnabled = async (): Promise<boolean> => {
  const value = await getAsyncStoreItem(BIOMETRIC_KEY);
  return value === 'true';
};
