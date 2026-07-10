import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { BookTile, Flex } from '~/design-system/custom-components';
import { FONT_WEIGHTS } from '~/design-system/tokens';
import { useRQGetBasicQuery } from '~/shared-api/resourceApis';
import QueryState from '~/utility/QueryState';
import { getSpotlightContent } from './helpers/helper';
import { navigate } from '~/services/navigationService';
import { screenNames } from '~/utils/screenNames';

const SpotLight = () => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useRQGetBasicQuery({
      queryKey: ['transactions', 'recent'],
      endpoint: '/books/',
    });

  const spotlightBook = useMemo(() => {
    if (!data?.results?.length) return null;

    const books = data.results;
    return books[Math.floor(Math.random() * books.length)] || {};
  }, [data]);

  // console.log('spotlightBook', spotlightBook);

  const spotlight = useMemo(() => getSpotlightContent(), []);

  console.log(spotlightBook?.formats['image/jpeg']);
  return (
    <View style={styles.container}>
      <Flex
        gap={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        <Text variant="headlineMedium" style={styles.title}>
          {spotlight.title}
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          {spotlight.subtitle}
        </Text>
      </Flex>

      <View style={styles.spotlightContainer}>
        <QueryState
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error as any}
          onRetry={refetch}
        >
          <BookTile
            type="list"
            title={spotlightBook?.title ?? ''}
            description={
              spotlightBook?.summaries?.[0] ??
              `By ${spotlightBook?.authors
                ?.map((a: any) => a?.name)
                .join(', ')}`
            }
            imageSource={{ uri: spotlightBook?.formats?.['image/jpeg'] }}
            price="$10.99"
            onPress={() => {
              navigate(screenNames.OTHER_STACK, {
                screen: screenNames.BOOK_DETAILS,
                params: { bookId: spotlightBook?.id },
              });
            }}
          />
        </QueryState>
      </View>
    </View>
  );
};

export default SpotLight;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderRadius: 24,
      // alignItems: 'center',
      gap: 16,
      overflow: 'hidden',
    },
    title: {
      color: colors.white,
      fontWeight: FONT_WEIGHTS.medium,
    },
    subtitle: {
      color: colors.white,
      opacity: 0.85,
      // textAlign: 'center',
      maxWidth: '90%',
    },
    spotlightContainer: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
  });
