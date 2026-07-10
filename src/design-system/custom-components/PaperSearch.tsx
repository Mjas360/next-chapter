import { MagnifyingGlassIcon, XIcon } from 'phosphor-react-native';
import React from 'react';
import { Searchbar, SearchbarProps } from 'react-native-paper';

interface PaperSearchProps extends SearchbarProps {}

export const PaperSearch = (props: PaperSearchProps) => {
  return (
    <Searchbar
      {...props}
      icon={({ color, size }) => (
        <MagnifyingGlassIcon color={color} size={size} />
      )}
      clearIcon={props => (
        <XIcon size={props.size} color={props.color} weight="bold" />
      )}
    />
  );
};
