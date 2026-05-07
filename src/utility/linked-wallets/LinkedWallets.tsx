import { CaretRightIcon } from 'phosphor-react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import ListRenderer from '~/design-system/custom-components/ListRenderer';
import LinkedWalletItem from './components/LinkedWalletItem';

const data = [
  {
    id: 'mtn-money',
    label: 'MTN Mobile Money',
    sub: 'Phone No: *****585',
    image:
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776955908/mtn-logo-1_tci8uh.png',
  },
  {
    id: 'orange-money',
    label: 'Orange Mobile Money',
    sub: 'Phone No: *****585',
    image:
      'https://res.cloudinary.com/dtprfylxq/image/upload/v1776955913/orange-mm-logo-1_lzkzuo.jpg',
  },
  {
    id: 'new-account',
    label: 'Link an account',
    sub: '',
    image: '',
  },
];

export default function Example() {
  const { colors } = useAppTheme();

  return (
    <ListRenderer
      data={data}
      variant="swipeable"
      keyExtractor={item => item.id}
      renderItem={item => (
        <LinkedWalletItem
          id={item.id}
          label={item.label}
          subLabel={item.sub}
          image={{ uri: item.image }}
          onPressNew={() => console.log('Pressed new')}
          action={
            <Pressable>
              <CaretRightIcon size={20} weight="bold" color={colors.gray2} />
            </Pressable>
          }
        />
      )}
    />
  );
}
