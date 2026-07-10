import { useMemo } from 'react';

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { http } from '~/configs/httpConfig';

interface InfiniteMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

interface InfiniteApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: InfiniteMeta;
}

interface UseInfiniteResourceProps<T, TResult = T[]> {
  queryKey: QueryKey;

  endpoint: string;

  params?: Record<string, any>;

  /**
   * Optional transform.
   *
   * Example:
   * select: groupTransactionsByMonth
   */
  select?: (data: T[]) => TResult;
}

export function useInfiniteResource<T, TResult = T[]>(
  props: UseInfiniteResourceProps<T, TResult>,
) {
  const { queryKey, endpoint, params, select } = props;

  const query = useInfiniteQuery({
    queryKey,

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await http.get<{
        data: InfiniteApiResponse<T>;
      }>(endpoint, {
        params: {
          ...params,
          page: pageParam,
        },
      });

      return response.data;
    },

    getNextPageParam: (lastPage: any) => {
      if (lastPage?.meta?.current_page >= lastPage?.meta?.last_page) {
        return undefined;
      }

      return lastPage?.meta?.current_page + 1;
    },
  });

  const data: any = useMemo(() => {
    return query.data?.pages.flatMap(page => page.data) ?? [];
  }, [query.data]);

  const transformedData = useMemo(() => {
    return select ? select(data?.data) : (data as TResult);
  }, [data, select]);

  const lastPage: any = query.data?.pages[query.data?.pages.length - 1];

  return {
    data: transformedData,

    rawData: data,

    meta: lastPage?.meta,

    isLoading: query.isLoading,

    isFetching: query.isFetching,

    isRefreshing: query.isRefetching && !query.isFetchingNextPage,

    isFetchingNextPage: query.isFetchingNextPage,

    hasNextPage: query.hasNextPage ?? false,

    loadMore: query.fetchNextPage,

    refresh: query.refetch,

    error: query.error,

    isError: query.isError,
  };
}
