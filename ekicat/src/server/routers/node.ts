import { procedure, router } from "server/trpc"
import { NodeService } from "server/services";

const nodeSvc = new NodeService();

export const nodeRouter = router({
    listNodes: procedure.query((opts) => {
        return nodeSvc.listNodes();
    }),
});
