import { initTRPC } from '@trpc/server';

// Minimal tRPC router for Next.js app routes
const t = initTRPC.context<{}>().create();

export const appRouter = t.router({});

export type AppRouter = typeof appRouter;
