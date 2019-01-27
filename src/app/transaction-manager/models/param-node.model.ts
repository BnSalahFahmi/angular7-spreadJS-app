import { Node } from "./node.model";

export interface ParamNode extends Node {
    param1: string;
    param2: string;
}

export function mockParamNode(): ParamNode {
	return {
        id: null,
        name: 'Test',
        param1: 'Param1',
        param2: 'Param2'
	}
}