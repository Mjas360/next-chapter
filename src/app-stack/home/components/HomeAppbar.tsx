import { BellIcon, HeadsetIcon } from 'phosphor-react-native';
import React from 'react';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import Flex from '~/design-system/custom-components/Flex';
import { openHelpCenter } from '~/utils/externalLinkActions';

const HomeAppbar = () => {
  const { colors } = useAppTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Content
        title={
          <Flex direction="row" align="center" gap={8}>
            {/* <Avatar.Image
              style={{
                borderRadius: 6,
              }}
              size={26}
              source={require('@assets/logos/ios-app-icon.png')}
            /> */}
            <Text
              style={{
                // fontFamily: 'Montserrat-SemiBold',
                fontSize: 20,
                letterSpacing: 0.9,
              }}
            >
              Moonie
            </Text>
          </Flex>
        }
        style={{
          alignItems: 'flex-start',
          // marginLeft: -32,
        }}
      />
      <Appbar.Action
        icon={({ size, color }) => (
          <HeadsetIcon size={size} color={color} weight="bold" />
        )}
        onPress={openHelpCenter}
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
