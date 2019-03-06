import { ObjectNode } from "./object-node.model";

export interface SourceParamaterNode extends ObjectNode {
    int: number;
    double: number;
    date: Date;
    ddpairs: Date[];
    idpairs: number[];
    ilist: number[];
    dlist: number[];
    doublepairs: number[];
}

export function mockSourceParamaterNode(): SourceParamaterNode {
    return {
        id: null,
        name: 'Test',
        type: 'Source Parameter',
        jsonObject: {},
        int: null,
        double: null,
        date: null,
        ddpairs: [],
        idpairs: [],
        ilist: [],
        dlist: [],
        doublepairs: []
    }
}