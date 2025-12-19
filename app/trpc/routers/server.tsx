/**
 * Server-side helpers for calling tRPC directly from Server Components
 *
 * Usage:
 *  const result = await withServerCaller(async (caller) => {
 *    return await caller.exampleRouter.someQuery({ ... });
 *  });
 *
 * Note: Replace `any` usages with proper router types when the router file/type
 * (e.g. `AppRouter`) is available.
 */

import { createCallerFactory } from '../init';

/** Returns a caller instance that runs inside the server context */
export function getServerCaller() {
  // createCallerFactory() returns a caller wired to `createTrpcContext`
  // (it may internally use the async context). Keep it as-is so it matches
  // the server-side factory in `init.ts`.
  return createCallerFactory() as any;
}

/**
 * Helper to run an async function with the server caller.
 * Example:
 *   const data = await withServerCaller(c => c.myRouter.myQuery({ id: 1 }));
 */
export async function withServerCaller<T>(
  fn: (caller: ReturnType<typeof getServerCaller>) => Promise<T> | T
): Promise<T> {
  const caller = getServerCaller();
  // The factory returns a caller that can be used immediately by your server code.
  return await fn(caller);
}