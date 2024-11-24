import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

import { NodeService } from "@/api/services/node";

const nodeSvc = new NodeService();

export const appRouter = trpc.router()
    .query("listNodes", {
        resolve() {
            return nodeSvc.listNodes();
        },
    });

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
