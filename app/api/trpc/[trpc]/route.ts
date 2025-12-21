// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { appRouter } from '~/server/api/root';
import { createTRPCContext } from '~/server/api/trpc';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: req as unknown as Request,
    router: appRouter,
    createContext: () => createTRPCContext({ 
      req: req as unknown as Request, 
      resHeaders: new Headers() 
    }),
  });

export { handler as GET, handler as POST };