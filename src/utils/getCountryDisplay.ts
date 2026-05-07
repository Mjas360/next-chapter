import { CountryType } from './types';

/**
 * Returns a simple display string like:
 * 🇳🇬 +234
 */
export const getCountryDisplay = (country: CountryType) => {
  const flag = getFlagEmoji(country.countryCode);
  return `${flag} ${country.dialCode}  `;
};

/**
 * Converts ISO country code → emoji flag
 */
const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
};
