import { ImageSourcePropType, ViewStyle } from "react-native";

export interface BookTileProps {
  type: 'block' | 'list';
  onPress?: () => void;
  onAddToFavoritePress?: () => void;
  imageSource?: ImageSourcePropType;
  favorite?: boolean;
  title: string;
  description: string;
  price: string;
  style?: ViewStyle | ViewStyle[];
}