import React, { ReactNode } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

type EmptyStateProps = {
  message?: string | null;
  image?: ImageSourcePropType;
  imageSize?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_IMAGE = require('@assets/images/empty_tray.png');

const EmptyState = ({
  message = 'Nothing here yet.',
  image = DEFAULT_IMAGE,
  imageSize = 184,
  children,
  style,
}: EmptyStateProps) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: imageSize,
          height: imageSize * 0.82,
        }}
      />

      {message !== null && (
        <Text
          variant="bodyLarge"
          style={[
            styles.message,
            {
              color: colors.gray3,
            },
          ]}
        >
          {message}
        </Text>
      )}

      {children}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  message: {
    textAlign: 'center',
    maxWidth: '80%',
  },
});
