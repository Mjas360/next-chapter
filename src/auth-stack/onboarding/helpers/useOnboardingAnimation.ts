import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const useOnboardingAnimation = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const getFadeAnimation = (index: number) => {
    return {
      opacity: scrollX.interpolate({
        inputRange: [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [10, 0, -10],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  };

  return { scrollX, getFadeAnimation };
};