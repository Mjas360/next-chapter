import { t } from 'i18next';
import { PlusIcon } from 'phosphor-react-native';
import React, { ReactNode } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import Flex from '~/design-system/custom-components/Flex';
import {
    CARD_CONTAINER_PADDING,
    CARD_CONTAINER_RADIUS,
} from '~/design-system/tokens';

interface Props {
  id: string;
  label?: string;
  subLabel?: string;
  linked?: boolean;
  image?: Record<string, any>;
  action?: ReactNode;
  onPressNew?: () => void;
}

const LinkedWalletItem = ({
  label,
  id,
  subLabel,
  linked,
  image = {
    uri: '',
  },
  action,
  onPressNew,
}: Props) => {
  const { colors } = useAppTheme();

  if (id === 'new-account') {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          borderRadius: CARD_CONTAINER_RADIUS,
          padding: CARD_CONTAINER_PADDING,
          borderStyle: 'dashed',
          borderColor: colors.primary,
          borderWidth: 1.6,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Pressable
          onPress={onPressNew}
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
          }}
        >
          <PlusIcon size={20} weight="bold" color={colors.primary} />

          <Text
            variant="bodyLarge"
            style={{
              color: colors.primary,
              fontWeight: '600',
            }}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: CARD_CONTAINER_RADIUS,
        padding: CARD_CONTAINER_PADDING,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Image
        source={image}
        width={60}
        height={60}
        style={{
          borderRadius: 6,
          backgroundColor: colors.gray,
        }}
      />

      <Flex gap={4} style={{ width: '100%', flex: 1 }}>
        <Text style={{ fontWeight: '500', color: colors.gray3 }}>{label}</Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          variant="bodyLarge"
          style={{ fontWeight: '600' }}
        >
          {subLabel}
        </Text>
        {linked && (
          <Flex gap={8} direction="row" align="center">
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: colors.success,
                borderRadius: 999,
              }}
            />
            <Text style={{ color: colors.gray3 }}>{t('Linked account')}</Text>
          </Flex>
        )}
      </Flex>

      {action && action}
    </View>
  );
};

export default LinkedWalletItem;
