// server/api/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import type { IncomingMessage } from "http";
import type { NextApiRequest } from "next";
import { getSession } from "better-auth";

type CreateContextOptions = {
  session: any | null;
  req?: IncomingMessage | NextApiRequest | Request;
  resHeaders?: Headers;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    req: opts.req,
    resHeaders: opts.resHeaders,
  };
};

export const createTRPCContext = async (
  opts: NodeHTTPCreateContextFnOptions<IncomingMessage, any> & { 
    req: Request | IncomingMessage | NextApiRequest; 
    resHeaders?: Headers 
  }
) => {
  const session = await getSession(opts.req);
  return createInnerTRPCContext({
    session,
    req: opts.req,
    resHeaders: opts.resHeaders,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);