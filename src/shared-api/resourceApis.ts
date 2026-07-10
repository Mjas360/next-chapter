import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { http } from '~/configs/httpConfig';
import { buildQueryString } from '~/utils/util';

type BaseOptions<TData> = Omit<
  UseQueryOptions<TData, AxiosError>,
  'queryKey' | 'queryFn'
>;

type HttpClientType = 'public' | 'secure';

const getClient = (type: HttpClientType) => {
  return type === 'public' ? http : http;
};

export const useRQGetFilteredQuery = <TData = any>(
  endpoint: string,
  filters?: Record<string, any>,
  enabled: boolean = true,
  options?: BaseOptions<TData>,
  client: HttpClientType = 'secure',
) => {
  const queryString = buildQueryString(filters ?? {});
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;

  const httpClient = getClient(client);

  return useQuery<TData, AxiosError>({
    queryKey: [endpoint, filters, client],
    enabled,
    queryFn: async (): Promise<TData> => {
      const res = await httpClient.get(url);

      if (res.status !== 200) {
        throw new Error('Unexpected server response');
      }

      return res.data?.data ?? res.data;
    },
    ...options,
  });
};

export const useRQGetBasicQuery = <TData = any>({
  queryKey,
  endpoint,
  client = 'secure',
  options,
}: {
  queryKey: readonly unknown[];
  endpoint: string;
  client?: HttpClientType;
  options?: BaseOptions<TData>;
}) => {
  const httpClient = getClient(client);

  return useQuery<TData, AxiosError>({
    queryKey: [...queryKey, client],
    queryFn: async (): Promise<TData> => {
      const res = await httpClient.get(endpoint);

      if (res.status !== 200) {
        throw new Error('Unexpected server response');
      }

      return res.data?.data ?? res.data;
    },
    ...options,
  });
};

type HttpMethod = 'post' | 'put' | 'patch' | 'delete';

export const useRQBasicMutation = <TData = any, TVariables = any>({
  endpoint,
  method = 'post',
  client = 'secure',
  options,
}: {
  endpoint: string;
  method?: HttpMethod;
  client?: HttpClientType;
  options?: UseMutationOptions<TData, AxiosError, TVariables>;
}) => {
  const httpClient = getClient(client);

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      let res;

      if (method === 'delete') {
        const config: AxiosRequestConfig = {
          data: variables,
        };

        res = await httpClient.delete(endpoint, config);
      } else {
        res = await httpClient[method](endpoint, variables);
      }

      if (![200, 201].includes(res.status)) {
        throw new Error('Unexpected server response');
      }

      return res.data?.data ?? res.data;
    },
    ...options,
  });
};
