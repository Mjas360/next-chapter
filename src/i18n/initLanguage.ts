import { detectLanguage } from './helpers/detectLanguage';
import i18n from './i18n';

export const initLanguage = async () => {
  const lng = await detectLanguage();

  await i18n.changeLanguage(lng);

  return lng;
};
