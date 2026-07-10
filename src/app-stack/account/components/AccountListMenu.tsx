import { CaretRightIcon, Icon } from 'phosphor-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

interface AccountMenuItemProps {
  icon: Icon;
  title: string;
  onPress: () => void;
  color?: string;
}

const AccountMenuItem: React.FC<AccountMenuItemProps> = ({
  icon,
  title,
  onPress,
  color,
}) => {
  const { colors } = useAppTheme();
  const Icon = icon;

  const itemColor = color || colors.black;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 20,
        backgroundColor: colors.white,
      }}
    >
      <Icon size={24} color={itemColor} />

      <Text
        variant="bodyLarge"
        numberOfLines={1}
        style={{ color: itemColor, flex: 1 }}
      >
        {title}
      </Text>

      <CaretRightIcon size={20} color={colors.gray2} />
    </Pressable>
  );
};

interface AccountListMenuProps {
  items: AccountMenuItemProps[];
}

const AccountListMenu: React.FC<AccountListMenuProps> = ({ items }) => {
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={`${item.title}-${index}`}>
          <AccountMenuItem {...item} />

          {index < items.length - 1 && <Divider style={{ opacity: 0.6 }} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default AccountListMenu;
