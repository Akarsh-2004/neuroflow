// server/api/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { auth } from "~/auth";

type CreateContextOptions = {
  session: any | null;
  req?: NextApiRequest | Request;
  res?: NextApiResponse;
  resHeaders?: Headers;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    req: opts.req,
    res: opts.res,
    resHeaders: opts.resHeaders,
  };
};

export const createTRPCContext = async (
  opts: NodeHTTPCreateContextFnOptions<NextApiRequest, any>
) => {
  const session = await getServerSession(auth);
  return createInnerTRPCContext({
    session,
    req: opts.req,
    res: opts.res,
    resHeaders: new Headers(),
  });
};