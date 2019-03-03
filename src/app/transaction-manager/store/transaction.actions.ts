import { Action, UPDATE } from '@ngrx/store';
import { type } from '../../shared/utilityHelpers';
import { ShowLoader, HideLoader } from '../../shared/decorators';
import { Transaction } from '../models/transaction.model';

export const LOAD_TRANSACTION_DATA = '[Transaction] Load Transaction Data';
export const LOAD_TRANSACTION_DATA_SUCCESS= '[Transaction] Load Transaction Data Success';
export const LOAD_TRANSACTION_DATA_FAIL= '[Transaction] Load Transaction Data Fail';

export const ADD_TRANSACTION= '[Transaction] Add';
export const ADD_TRANSACTION_SUCCESS= '[Transaction] Add Success';
export const ADD_TRANSACTION_FAIL= '[Transaction] Add Fail';

export const UPDATE_TRANSACTION= '[Transaction] Update';
export const UPDATE_TRANSACTION_SUCCESS= '[Transaction] Update Success';
export const UPDATE_TRANSACTION_FAIL= '[Transaction] Update Fail';

export const GET_TRANSACTION= '[Transaction] Get Transaction';
export const GET_TRANSACTION_SUCCESS= '[Transaction] Get Transaction Success';
export const GET_TRANSACTION_FAIL= '[Transaction] Get Transaction Fail';

export const DELETE_TRANSACTION= '[Transaction] Delete';
export const DELETE_TRANSACTION_SUCCESS= '[Transaction] Delete Success';
export const DELETE_TRANSACTION_FAIL= '[Transaction] Delete Fail';

export const SEARCH =           '[Transaction] Search';
export const SEARCH_COMPLETED =  '[Transaction] Search Completed';
export const SEARCH_FAILED =  '[Transaction] Search Failed';

@ShowLoader()
export class LoadTransactionDataAction implements Action {
    readonly type = LOAD_TRANSACTION_DATA;
    constructor(public payload?: any) { }
}

@HideLoader(LOAD_TRANSACTION_DATA)
export class LoadTransactionDataSuccessAction implements Action {
    readonly type = LOAD_TRANSACTION_DATA_SUCCESS;
    constructor(public payload?: any) { }
}

@HideLoader(LOAD_TRANSACTION_DATA)
export class LoadTransactionDataFailAction implements Action {
    readonly type = LOAD_TRANSACTION_DATA_FAIL;
    constructor(public payload?: any) { }
}

export class AddTransactionAction implements Action {
    readonly type = ADD_TRANSACTION;
    constructor(public payload?: any) { }
}

export class AddTransactionSuccessAction implements Action {
    readonly type = ADD_TRANSACTION_SUCCESS;
    constructor(public payload?: any) { }
}

export class AddTransactionFailAction implements Action {
    readonly type = ADD_TRANSACTION_FAIL;
    constructor(public payload?: any) { }
}

export class UpdateTransactionAction implements Action {
    readonly type = UPDATE_TRANSACTION;
    constructor(public payload?: any) { }
}

export class UpdateTransactionSuccessAction implements Action {
    readonly type = UPDATE_TRANSACTION_SUCCESS;
    constructor(public payload?: any) { }
}

export class UpdateTransactionFailAction implements Action {
    readonly type = UPDATE_TRANSACTION_FAIL;
    constructor(public payload?: any) { }
}

export class GetTransactionAction implements Action {
    readonly type = GET_TRANSACTION;
    constructor(public payload?: any) { }
}

export class GetTransactionSuccessAction implements Action {
    readonly type = GET_TRANSACTION_SUCCESS;
    constructor(public payload?: any) { }
}

export class GetTransactionFailAction implements Action {
    readonly type = GET_TRANSACTION_FAIL;
    constructor(public payload?: any) { }
}

export class DeleteTransactionAction implements Action {
    readonly type = DELETE_TRANSACTION;
    constructor(public payload?: any){ }
}

export class DeleteTransactionSuccessAction implements Action {
    readonly type = DELETE_TRANSACTION_SUCCESS;
    constructor(public payload?: any){ }
}

export class DeleteTransactionFailAction implements Action {
    readonly type = DELETE_TRANSACTION_FAIL;
    constructor(public payload?: any){ }
}

export class SearchTransactionAction implements Action {
    readonly type = SEARCH;
    constructor(public payload?: any) { }
}

export class SearchTransactionSuccessAction implements Action {
    readonly type = SEARCH_COMPLETED;
    constructor(public payload?: any[]) { }
}

export class SearchTransactionFailAction implements Action {
    readonly type = SEARCH_FAILED;
    constructor(public payload?: any) { }
}

export type ActionType = LoadTransactionDataAction | LoadTransactionDataSuccessAction | LoadTransactionDataFailAction
| AddTransactionAction | AddTransactionSuccessAction | AddTransactionFailAction
| UpdateTransactionAction | UpdateTransactionSuccessAction | UpdateTransactionFailAction
| GetTransactionAction | GetTransactionSuccessAction | GetTransactionFailAction
| DeleteTransactionAction | DeleteTransactionSuccessAction | DeleteTransactionFailAction
| SearchTransactionAction | SearchTransactionSuccessAction | SearchTransactionFailAction;