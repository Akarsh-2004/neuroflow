'use client';

import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Minimal provider to satisfy app layout while tRPC is being wired
export const queryClient = new QueryClient();

export function TrpcProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
