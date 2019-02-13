import { Transaction } from "./transaction.model";

export interface TransactionTab {
    id: number,
    type: string,
    heading: string,
    active: boolean,
    closable: boolean,
    transaction: Transaction
}