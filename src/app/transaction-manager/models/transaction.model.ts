export interface Transaction {
    id: number;
	name: string;
	description: string;
	creator: object;
	creationDate: Date;
	updator: object;
	updateDate: Date;
	cockpit: any;
}

export function mockTransaction(): Transaction {
	return {
		id: 1,
		name: 'Test',
		description: 'Some description',
		creator: new Object('Fahmi BEN SALAH'),
		creationDate: new Date(),
		updator: null,
		updateDate: null,
		cockpit: null
	}
}