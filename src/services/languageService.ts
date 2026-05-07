import { setAppLanguage } from '~/i18n/helpers/languageStorage';
import i18n from '../i18n/i18n';

export const changeLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  await setAppLanguage(lang);
};

export const getCurrentLanguage = () => {
  return i18n.language;
};
