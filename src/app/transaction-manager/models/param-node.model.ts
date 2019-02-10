import { Node } from "./node.model";

export interface ParamNode extends Node {
    param1: string;
    param2: string;
}

export function mockParamNode(): ParamNode {
	return {
        id: null,
        name: 'Test',
        param1: '10',
        param2: '20'
	}
}