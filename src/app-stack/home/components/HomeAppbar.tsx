import { BellIcon, MagnifyingGlassIcon } from 'phosphor-react-native';
import React from 'react';
import { Platform } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { Flex } from '~/design-system/custom-components';
import { FONT_WEIGHTS } from '~/design-system/tokens';
import { navigateToSearch } from '~/utils/externalLinkActions';

const APP_LOGO_MARGIN_LEFT = Platform.OS === 'ios' ? -40 : 12; // Adjust this value to move the logo left or right

const HomeAppbar = () => {
  const { colors } = useAppTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Content
        title={
          <Flex direction="row" align="center" gap={8}>
            <Avatar.Image
              style={{
                borderRadius: 8,
              }}
              size={26}
              source={require('@assets/logos/app-icon.png')}
            />
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 0.9,
                fontWeight: FONT_WEIGHTS.medium,
              }}
            >
              NextChapter
            </Text>
          </Flex>
        }
        style={{
          alignItems: 'flex-start',
          marginLeft: APP_LOGO_MARGIN_LEFT,
        }}
      />
      <Appbar.Action
        icon={({ size, color }) => (
          <MagnifyingGlassIcon size={size} color={color} weight="bold" />
        )}
        onPress={() => navigateToSearch()}
      />
      <Appbar.Action
        icon={({ size, color }) => (
          <BellIcon size={size} color={color} weight="bold" />
        )}
        onPress={() => {}}
      />
    </Appbar.Header>
  );
};

export default HomeAppbar;
