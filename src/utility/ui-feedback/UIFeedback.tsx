import {
  CheckIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XIcon,
} from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { SCREEN_HORIZONTAL_PADDING } from '~/design-system/tokens';
import { hideUIFeedback } from '~/redux/reducers/uiFeedbackSlice';
import { RootState } from '~/redux/store';
import {
  removeActionFromRegistry,
  runActionFromRegistry,
} from '~/utils/actionRegistry';

const CONFIG = {
  loading: { icon: SpinnerIcon, color: '#54206C' },
  success: { icon: CheckIcon, color: '#2E7D32' },
  error: { icon: XIcon, color: '#C62828' },
  warning: { icon: WarningIcon, color: '#ED6C02' },
  info: { icon: InfoIcon, color: '#1565C0' },
};

export const UIFeedback = () => {
  const { colors } = useAppTheme();
  const dispatch = useDispatch();
  const { visible, type, message, actionLabel, actionId, dismissable } =
    useSelector((state: RootState) => state.uiFeedbackSlice);

  const config = useMemo(() => CONFIG[type] ?? CONFIG.info, [type]);

  if (!visible) return null;

  const Icon = config.icon;

  const onAction = async () => {
    if (actionId) {
      await runActionFromRegistry(actionId, {});
      removeActionFromRegistry(actionId);
    }
    dispatch(hideUIFeedback());
  };

  const onDismiss = () => {
    dispatch(hideUIFeedback());
    if (actionId) removeActionFromRegistry(actionId);
  };

  return (
    <Portal>
      <View style={styles.overlay}>
        <View
          style={[
            {
              paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
              paddingVertical: 44,
              backgroundColor: colors.white,
            },
            styles.wrapper,
          ]}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Avatar.Icon
              style={{ backgroundColor: config.color }}
              size={44}
              icon={({ size }) =>
                type === 'loading' ? (
                  <ActivityIndicator color="white" size={size} />
                ) : (
                  <Icon size={size} color="white" weight="bold" />
                )
              }
            />

            <Text
              variant="bodyLarge"
              style={{
                color: colors.black,
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              {message ?? type}
            </Text>

            {actionLabel && (
              <Pressable onPress={onAction}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: colors.blue,
                    marginTop: 20,
                    fontWeight: '500',
                  }}
                >
                  {actionLabel}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {dismissable && (
          <Pressable
            onPress={onDismiss}
            style={{
              backgroundColor: colors.white,
              marginTop: 24,
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 999,
              opacity: 0.6,
            }}
          >
            <XIcon weight="bold" size={24} />
          </Pressable>
        )}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '86%',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    alignItems: 'center',
    gap: 16,
    borderRadius: 20,
    maxHeight: '92%',
    minHeight: 100,
  },
});
