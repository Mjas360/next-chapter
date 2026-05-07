import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStoreItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getAsyncStoreItem = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeAsyncStoreItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const setBiometricEnabled = async (enabled: boolean) => {
  await setAsyncStoreItem('biometric_enabled', String(enabled));
};
