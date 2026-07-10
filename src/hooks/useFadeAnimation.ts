import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

type UseFadeAnimationProps = {
  visible: boolean;
  duration?: number;
};

export const useFadeAnimation = ({
  visible,
  duration = 250,
}: UseFadeAnimationProps) => {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShouldRender(false);
        }
      });
    }
  }, [visible, duration, opacity]);

  return {
    shouldRender,
    animatedStyle: {
      opacity,
    },
  };
};
