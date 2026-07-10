import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { BookTile, ButtonTabs } from '~/design-system/custom-components';
import EmptyState from '~/design-system/custom-components/EmptyState';
import { navigate } from '~/services/navigationService';
import { useRQGetBasicQuery } from '~/shared-api/resourceApis';
import QueryState from '~/utility/QueryState';
import { screenNames } from '~/utils/screenNames';

const MAX_BOOKS = 10;

const BookListing = ({ maxBooks = MAX_BOOKS }: { maxBooks?: number }) => {
  const [activeTab, setActiveTab] = useState('all');

  const { data, isLoading, isFetching, isError, error, refetch } =
    useRQGetBasicQuery({
      queryKey: ['books'],
      endpoint: '/books/',
    });
  const books = useMemo(() => {
    if (!data?.results) return [];

    let filtered = data.results;

    if (activeTab !== 'all') {
      filtered = filtered.filter((book: any) =>
        book.subjects?.some((subject: string) =>
          subject.toLowerCase().includes(activeTab.toLowerCase()),
        ),
      );
    }

    return filtered.slice(0, maxBooks);
  }, [data, activeTab, maxBooks]);

  return (
    <View style={{ gap: 16 }}>
      <ButtonTabs
        scroll
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { label: 'All', value: 'all' },
          { label: 'Fiction', value: 'fiction' },
          { label: 'Drama', value: 'drama' },
          { label: 'Crime', value: 'crime' },
          { label: 'Non-Fiction', value: 'non-fiction' },
        ]}
      />

      <QueryState
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        onRetry={refetch}
      >
        <View style={{ gap: 16 }}>
          {books.length === 0 && (
            <EmptyState message={t('No books available')} />
          )}
          {books.map((book: any) => (
            <BookTile
              key={book.id}
              type="list"
              title={book.title}
              description={
                book.summaries?.[0] ??
                `By ${book.authors.map((a: any) => a.name).join(', ')}`
              }
              imageSource={{
                uri: book.formats['image/jpeg'],
              }}
              price="$10.99"
              onPress={() => {
                navigate(screenNames.OTHER_STACK, {
                  screen: screenNames.BOOK_DETAILS,
                  params: { bookId: book.id },
                });
              }}
            />
          ))}
        </View>
      </QueryState>
    </View>
  );
};

export default BookListing;
