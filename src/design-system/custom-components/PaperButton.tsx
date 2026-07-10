import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { spacing } from '../tokens';

type Size = 'sm' | 'md' | 'lg';

type Props = ButtonProps & {
  size?: Size;
};

const sizeMap = {
  sm: { height: 36, fontSize: 14, padding: spacing.sm },
  md: { height: 44, fontSize: 14, padding: spacing.md },
  lg: { height: 54, fontSize: 16, padding: spacing.lg },
};

export function PaperButton({
  size = 'lg',
  contentStyle,
  labelStyle,
  ...props
}: Props) {
  const s = sizeMap[size];

  return (
    <Button
      {...props}
      disabled={props.disabled || props.loading}
      contentStyle={[
        {
          height: s.height,
          paddingHorizontal: s.padding,
        },
        contentStyle,
      ]}
      labelStyle={[
        {
          fontSize: s.fontSize,
          textTransform: 'capitalize',
        },
        labelStyle,
      ]}
    />
  );
}
