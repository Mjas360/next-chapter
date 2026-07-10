import { Platform } from 'react-native';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// export const typography = {
//   h1: { fontSize: 28, fontWeight: "700" },
//   h2: { fontSize: 22, fontWeight: "700" },
//   h3: { fontSize: 18, fontWeight: "600" },

//   body: { fontSize: 14, fontWeight: "400" },
//   caption: { fontSize: 12, fontWeight: "400" },
// };

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 999,
};

export const INSET_SAFE_MARGIN = Platform.OS === 'ios' ? 16 : 20;

export const FONT_WEIGHTS: any = {
  regular: '400',
  medium: '500',
  semiBold: Platform.OS === 'ios' ? '600' : '800',
  bold: Platform.OS === 'ios' ? '700' : '800',
};

export const SCREEN_HORIZONTAL_PADDING = 20;
export const SCREEN_CONTENT_MARGIN_BOTTOM = 44;

export const CARD_CONTAINER_PADDING = 20;
export const CARD_CONTAINER_RADIUS = 16;
