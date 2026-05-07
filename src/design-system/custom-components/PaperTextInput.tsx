import React, { use } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { useAppTheme } from '../app-theme/useAppTheme';

type Size = 'sm' | 'md' | 'lg';

type PaperTextInputProps = TextInputProps & {
  errorMessage?: string;
  size?: Size;
};

const outlineSizeMap = {
  sm: { height: 36, fontSize: 13 },
  md: { height: 44, fontSize: 14 },
  lg: { height: 54, fontSize: 16 },
};

const flatSizeMap = {
  sm: { height: 48, fontSize: 13 },
  md: { height: 58, fontSize: 14 },
  lg: { height: 68, fontSize: 16 },
};

export const PaperTextInput = ({
  size = 'lg',
  errorMessage,
  style,
  ...props
}: PaperTextInputProps) => {
  const { colors } = useAppTheme();
  const s =
    props.mode === 'outlined' ? outlineSizeMap[size] : flatSizeMap[size];

  return (
    <View>
      <TextInput
        {...props}
        style={{
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          height: s.height,
          fontSize: s.fontSize,
        }}
        error={!!errorMessage}
      />

      {!!errorMessage && (
        <Text style={{ color: colors.danger, marginTop: 7, fontSize: 12 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
