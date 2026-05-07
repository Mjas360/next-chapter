import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

type PhoneFormatStyle = 'national' | 'international';

type FormatPhoneNumberParams = {
  value?: string;
  countryCode?: string;
  style?: PhoneFormatStyle;
};

export const formatPhoneNumber = ({
  value,
  countryCode,
  style = 'national',
}: FormatPhoneNumberParams) => {
  if (!value) return '';

  try {
    const parsed = value.startsWith('+')
      ? phoneUtil.parse(value)
      : phoneUtil.parse(value, countryCode);

    if (!phoneUtil.isValidNumber(parsed)) return value;

    const formatType =
      style === 'national'
        ? PhoneNumberFormat.NATIONAL
        : PhoneNumberFormat.INTERNATIONAL;

    return phoneUtil.format(parsed, formatType);
  } catch {
    return value;
  }
};
