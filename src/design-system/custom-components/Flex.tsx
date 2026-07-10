import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface FlexProps {
  direction?: ViewStyle["flexDirection"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  gap?: number;
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const Flex = ({
  direction = "column",
  align,
  justify,
  gap = 16,
  width,
  height,
  style,
  children,
}: FlexProps) => {
  return (
    <View
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          width,
          height,
          ...(gap ? { gap } : {}),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
