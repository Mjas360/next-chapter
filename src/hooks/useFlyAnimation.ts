import { RefObject, useCallback } from 'react';
import { View } from 'react-native';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Point {
  x: number;
  y: number;
}

type Destination = RefObject<View | null> | Point;

export interface FlyAnimationOptions {
  source: RefObject<View | null>;
  destination: Destination;
  duration?: number;
  scaleTo?: number;
  onStart?: () => void;
  onFinished?: () => void;
}

const isPoint = (destination: Destination): destination is Point => {
  return (
    typeof destination === 'object' &&
    destination !== null &&
    'x' in destination &&
    'y' in destination
  );
};

export function useFlyAnimation() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const startAnimation = useCallback(
    ({
      sx,
      sy,
      sw,
      sh,
      tx,
      ty,
      duration,
      scaleTo,
      onFinished,
      onStart,
    }: {
      sx: number;
      sy: number;
      sw: number;
      sh: number;
      tx: number;
      ty: number;
      duration: number;
      scaleTo: number;
      onFinished?: () => void;
      onStart?: () => void;
    }) => {
      onStart?.();

      width.value = sw;
      height.value = sh;

      translateX.value = sx;
      translateY.value = sy;

      opacity.value = 1;
      scale.value = 1;

      translateX.value = withTiming(tx - sw / 2, {
        duration,
      });

      translateY.value = withTiming(
        ty - sh / 2,
        {
          duration,
        },
        finished => {
          if (!finished) {
            return;
          }

          opacity.value = withTiming(0, {
            duration: 150,
          });

          if (onFinished) {
            runOnJS(onFinished)();
          }
        },
      );

      scale.value = withTiming(scaleTo, {
        duration,
      });
    },
    [],
  );

  const fly = useCallback(
    ({
      source,
      destination,
      duration = 700,
      scaleTo = 0.002,
      onFinished,
      onStart,
    }: FlyAnimationOptions) => {
      source.current?.measureInWindow((sx, sy, sw, sh) => {
        if (isPoint(destination)) {
          startAnimation({
            sx,
            sy,
            sw,
            sh,
            tx: destination.x,
            ty: destination.y,
            duration,
            scaleTo,
            onFinished,
            onStart,
          });

          return;
        }

        destination.current?.measureInWindow((tx, ty, tw, th) => {
          startAnimation({
            sx,
            sy,
            sw,
            sh,
            tx: tx + tw / 2,
            ty: ty + th / 2,
            duration,
            scaleTo,
            onFinished,
            onStart,
          });
        });
      });
    },
    [startAnimation],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 9999,
    elevation: 9999,

    width: width.value,
    height: height.value,

    opacity: opacity.value,

    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  return {
    fly,
    animatedStyle,
  };
}