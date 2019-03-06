export interface ObjectNode {
    id: number;
	name: string;
	type: string;
	jsonObject: Object;
}

export function mockNode(): ObjectNode {
	return {
		id: 1,
		name: 'Test',
		type: 'object',
		jsonObject: {}
	}
}