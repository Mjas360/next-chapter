import {
    getAsyncStoreItem,
    removeAsyncStoreItem,
    setAsyncStoreItem,
} from '~/services/asyncStorage';

const KEY = 'app_language';

export const setAppLanguage = async (lang: string) => {
  await setAsyncStoreItem(KEY, lang);
};

export const getAppLanguage = async () => {
  return await getAsyncStoreItem(KEY);
};

export const clearAppLanguage = async () => {
  await removeAsyncStoreItem(KEY);
};
