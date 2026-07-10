import React from 'react';
import { Container, ScreenContent } from '~/design-system/custom-components';
import BookListing from '~/utility/BookListing';

const Discovery = () => {
  return (
    <ScreenContent applyInsets={false}>
      <Container
        gap={24}
        style={{
          flex: 1,
          marginTop: 16,
          marginBottom: 44,
        }}
      >
        <BookListing />
      </Container>
    </ScreenContent>
  );
};

export default Discovery;
