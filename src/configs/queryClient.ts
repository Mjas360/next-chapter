import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
  queries: {
    retry: 1, // safer for mobile networks
    retryDelay: () => 3000,
    staleTime: Infinity, // since you use real-time updates
    gcTime: 1000 * 60 * 5, // prevent memory leaks
    refetchOnReconnect: true, // useful in mobile
    refetchOnMount: false,
    refetchInterval: false,
  },

  mutations: {
    retry: 0,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
