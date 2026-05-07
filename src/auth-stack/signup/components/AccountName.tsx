import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import Flex from '~/design-system/custom-components/Flex';

interface Props {
  name: string;
  isLoading?: boolean;
}

const AccountName = ({ name, isLoading }: Props) => {
  const { colors } = useAppTheme();

  // TODO: fetch account name

  if (!name && !isLoading) return null;

  return (
    <Flex align="flex-end">
      {isLoading ? (
        <ActivityIndicator size={14} />
      ) : (
        <Text style={{ color: colors.success, fontWeight: '600' }}>{name}</Text>
      )}
    </Flex>
  );
};

export default AccountName;
