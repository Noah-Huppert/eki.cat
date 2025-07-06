import { z } from "zod";
import { router } from "server/trpc";
import { nodeRouter } from "server/routers/node";

export const appRouter = router({
    node: nodeRouter,
});

export type AppRouter = typeof appRouter;
