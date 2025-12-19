import type { inferAsyncReturnType } from '@trpc/server';
import { appRouter } from './router';

export const createTrpcContext = async () => ({ });
export type Context = inferAsyncReturnType<typeof createTrpcContext>;

// Factory used by server helpers to create a caller bound to server context
export function createCallerFactory() {
  return () => appRouter.createCaller({});
}
