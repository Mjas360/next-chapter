import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useDebounce } from 'use-debounce';
import {
    BookTile,
    Container,
    PaperSearch,
    ScreenContent,
} from '~/design-system/custom-components';
import EmptyState from '~/design-system/custom-components/EmptyState';
import { navigate } from '~/services/navigationService';
import { useRQGetBasicQuery } from '~/shared-api/resourceApis';
import QueryState from '~/utility/QueryState';
import { screenNames } from '~/utils/screenNames';

const SEARCH_DEBOUNCE_DELAY = 500;

const Search = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, SEARCH_DEBOUNCE_DELAY);

  const endpoint = useMemo(() => {
    return debouncedQuery
      ? `/books?search=${encodeURIComponent(debouncedQuery)}`
      : '/books/';
  }, [debouncedQuery]);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useRQGetBasicQuery({
      queryKey: ['books', debouncedQuery],
      endpoint,
    });

  return (
    <ScreenContent applyInsets={false} scroll={false}>
      <Container
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 44,
        }}
      >
        <PaperSearch
          placeholder="Search books or authors"
          value={query}
          onChangeText={setQuery}
          style={{
            marginBottom: 8,
          }}
        />

        <QueryState
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          onRetry={refetch}
        >
          <FlatList
            data={data?.results ?? []}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              paddingTop: 24,
              paddingBottom: 24,
              gap: 16,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <BookTile
                type="list"
                title={item.title}
                description={
                  item.summaries?.[0] ??
                  `By ${item.authors.map((a: any) => a.name).join(', ')}`
                }
                imageSource={{
                  uri: item.formats['image/jpeg'],
                }}
                price="$10.99"
                onPress={() => {
                  navigate(screenNames.OTHER_STACK, {
                    screen: screenNames.BOOK_DETAILS,
                    params: { bookId: item.id },
                  });
                }}
              />
            )}
            ListEmptyComponent={<EmptyState message="No books found." />}
          />
        </QueryState>
      </Container>
    </ScreenContent>
  );
};

export default Search;
