export interface Node {
    id: number;
	name: string;
}

export function mockNode(): Node {
	return {
		id: 1,
		name: 'Test'
	}
}