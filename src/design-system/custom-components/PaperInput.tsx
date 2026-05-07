import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { spacing } from '../tokens';

type Props = TextInputProps;

export function Input(props: Props) {
  return (
    <TextInput
      {...props}
      style={{
        marginVertical: spacing.sm,
      }}
    />
  );
}
