import { Snackbar } from 'react-native-paper';
export type UserType = {
  [key: string]: any;
};

export type CountryType = {
  countryCode: string;
  dialCode: string;
  [key: string]: any;
};

export type SnackbarVariantType =
  | 'error'
  | 'success'
  | 'info'
  | 'default'
  | 'warning';

  export type UIFeedbackVariantType =
  | 'loading'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
