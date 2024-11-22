import { db } from "@/db";

export class NodeService {
    async listNodes() {
        return db.query.nodeEdges.findMany();
    }
}
