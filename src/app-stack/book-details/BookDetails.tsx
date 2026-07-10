import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { Container, ScreenContent } from '~/design-system/custom-components';
import EmptyState from '~/design-system/custom-components/EmptyState';
import { useFlyAnimation } from '~/hooks/useFlyAnimation';
import { addToCart } from '~/redux/reducers/cartSlice';
import { useRQGetBasicQuery } from '~/shared-api/resourceApis';
import QueryState from '~/utility/QueryState';
import BookActions from './components/BookActions';
import BookHero from './components/BookHero';
import BookMetadata from './components/BookMetadata';
import BookSummary from './components/BookSummary';
import SubjectChips from './components/SubjectChips';

const { width } = Dimensions.get('window');

const BookDetails = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const { bookId } =
    (route.params as {
      bookId: number;
    }) || {};

  const {
    data: book,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useRQGetBasicQuery({
    queryKey: ['book', bookId],
    endpoint: `/books/${bookId}`,
  });

  const bookImageRef = useRef<View>(null);

  const { fly, animatedStyle } = useFlyAnimation();

  return (
    <ScreenContent
      applyInsets={false}
      styles={{
        position: 'relative',
      }}
    >
      <Container
        gap={24}
        style={{
          marginTop: 16,
          marginBottom: 44,
          position: 'relative',
        }}
      >
        <QueryState
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          onRetry={refetch}
        >
          {book ? (
            <>
              <BookHero book={book} ref={bookImageRef} />

              <BookActions
                book={book}
                onAddToCart={() =>
                  fly({
                    source: bookImageRef,
                    destination: {
                      x: width - 40,
                      y: -60,
                    },
                    onFinished: () => {
                      console.log('Animation complete');
                      dispatch(
                        addToCart({
                          id: book.id,
                          title: book.title,
                          author: book.authors?.[0]?.name ?? '',
                          image: book.formats['image/jpeg'],
                          price: book.price ?? 0,
                        }),
                      );
                    },
                  })
                }
              />

              <BookSummary book={book} />

              <BookMetadata book={book} />

              <SubjectChips title="Subjects" items={book.subjects} />

              <SubjectChips title="Bookshelves" items={book.bookshelves} />

              {/* Animated copy */}
              <Animated.View pointerEvents="none" style={animatedStyle}>
                <Image
                  source={{
                    uri: book.formats['image/jpeg'],
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 18,
                  }}
                />
              </Animated.View>
            </>
          ) : (
            <EmptyState message={t('Book not found')} />
          )}
        </QueryState>
      </Container>
    </ScreenContent>
  );
};

export default BookDetails;

export const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',

    left: 16,
    right: 16,
    top: 24,

    backgroundColor: 'transparent',
  },
});
