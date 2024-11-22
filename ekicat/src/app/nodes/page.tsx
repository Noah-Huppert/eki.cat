import { trpc } from "@/api/tprc/hooks";

export default function Nodes() {
    const nodes = trpc.useQuery([
        "listNodes", {}
    ]);
    return (
        <div>
            Here is a list of nodes! {JSON.stringify(nodes)}
        </div>
    )
}
