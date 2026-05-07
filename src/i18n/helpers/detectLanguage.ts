import * as RNLocalize from 'react-native-localize';
import { getAppLanguage } from './languageStorage';

export const detectLanguage = async () => {
  const saved = await getAppLanguage();

  if (saved) return saved;

  const deviceLang = RNLocalize.getLocales()?.[0]?.languageCode;

  return deviceLang || 'en';
};
