import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query';

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30, // 30s
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}

/** Singleton instance (optional convenience) */
export const queryClient = makeQueryClient();

/** Use this when hydrating on the server */
export const dehydrateOptions = {
  shouldDehydrateQuery: defaultShouldDehydrateQuery,
};

/** Exported transformer for tRPC or other utilities (no-op to avoid external dependency) */
export const transformer = {
  serialize: (v: unknown) => v,
  deserialize: (v: unknown) => v,
};