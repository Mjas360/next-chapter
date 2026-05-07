import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type UseBreathingAnimationProps = {
  minScale?: number;
  maxScale?: number;
  duration?: number;
  autoStart?: boolean;
};

export const useBreathingAnimation = ({
  minScale = 0.98,
  maxScale = 1,
  duration = 1800,
  autoStart = true,
}: UseBreathingAnimationProps = {}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [minScale, maxScale, minScale],
  });

  const start = () => {
    progress.setValue(0);

    animationRef.current = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration,
        easing: Easing.linear, // important
        useNativeDriver: true,
      }),
    );

    animationRef.current.start();
  };

  const stop = () => {
    animationRef.current?.stop();
  };

  useEffect(() => {
    if (autoStart) start();
    return stop;
  }, [autoStart]);

  return {
    animatedStyle: {
      transform: [{ scale }],
    },
    start,
    stop,
  };
};
