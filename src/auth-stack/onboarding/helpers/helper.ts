import { t } from 'i18next';
import { Dimensions } from 'react-native';
import { Extrapolation, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export const getIndicatorStyle = (scrollX: any, index: number) => {
  return {
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [0.8, 1.4, 0.8],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.4, 1, 0.4],
      Extrapolation.CLAMP,
    ),
  };
};

export const getTextFadeStyle = (scrollX: any, index: number) => {
  return {
    opacity: interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [10, 0, -10],
          Extrapolation.CLAMP,
        ),
      },
    ],
  };
};

export const ONBOARDING_DATA = [
  {
    id: '1',
    title: t('Send Money.\nPay Bills. Faster.'),
    subtitle: t(
      'Use your MTN and Orange Money accounts in one app. No switching, no delays.',
    ),
    image:
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776940498/onboarding-bg-1_cdqfrl.png',
    miniImages: [
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776955908/mtn-logo-1_tci8uh.png',
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776955913/orange-mm-logo-1_lzkzuo.jpg',
    ],
  },
  {
    id: '2',
    title: t('No Wallet.\nNo Waiting.'),
    subtitle: t(
      'Pay directly from your Mobile Money balance. No top-ups, no extra steps.',
    ),
    image:
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776947009/onboarding-bg-2_y0xo3w.png',
    miniImages: [
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776957461/shiled-icon_hykdqb.png',
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776958417/speed-icon_ghacwf.png',
    ],
  },
  {
    id: '3',
    title: t('Everything in\nOne Place.'),
    subtitle: t(
      'Buy airtime, pay bills, and send money in seconds. All from one app.',
    ),
    image:
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776947010/onboarding-bg-3_al9kyf.png',
    miniImages: [
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776958688/phone-call-icon_qufknd.png',
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776958688/internet-icon_yolz57.png',
    ],
  },
];
