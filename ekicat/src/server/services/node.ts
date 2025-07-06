import { db } from "db";

/**
 * Business logic for nodes.
 **/
export class NodeService {
    /**
     * List nodes.
     * :returns: All nodes
     **/
    async listNodes() {
        return db.query.nodeEdges.findMany();
    }
}
