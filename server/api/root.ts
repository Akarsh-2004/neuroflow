import { createTRPCRouter } from "../trpc";
import { exampleRouter } from "./routers/example";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  // Add other routers here
});

export type AppRouter = typeof appRouter;