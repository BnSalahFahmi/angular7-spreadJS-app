export interface Structure {
    id: number;
	name: string;
	description: string;
	creator: object;
	creationDate: Date;
	updator: object;
	updateDate: Date;
	template: any;
}

export function mockStructure(): Structure {
	return {
		id: 1,
		name: 'Test',
		description: 'Some description',
		creator: new Object('Fahmi BEN SALAH'),
		creationDate: new Date(),
		updator: null,
		updateDate: null,
		template: null
	}
}