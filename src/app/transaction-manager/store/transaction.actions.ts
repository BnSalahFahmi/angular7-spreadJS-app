import { Action } from '@ngrx/store';
import { type } from '../../shared/utilityHelpers';

    
export const LOAD_DATA = '[Transaction] Load Data';
export const LOAD_DATA_SUCCESS= '[Transaction] Load Data Success';
export const LOAD_DATA_FAIL= '[Transaction] Load Data Fail';

export const ADD_TRANSACTION= '[Transaction] Add';
export const ADD_TRANSACTION_SUCCESS= '[Transaction] Add Success';
export const ADD_TRANSACTION_FAIL= '[Transaction] Add Fail';

export const GET_TRANSACTION= '[Transaction] Get Transaction';
export const GET_TRANSACTION_SUCCESS= '[Transaction] Get Transaction Success';
export const GET_TRANSACTION_FAIL= '[Transaction] Get Transaction Fail';

export const DELETE_TRANSACTION= '[Transaction] Delete';
export const DELETE_TRANSACTION_SUCCESS= '[Transaction] Delete Success';
export const DELETE_TRANSACTION_FAIL= '[Transaction] Delete Fail';


export class LoadDataAction implements Action {
    readonly type = LOAD_DATA;
    constructor(public payload?: any) { }
}

export class LoadDataSuccessAction implements Action {
    readonly type = LOAD_DATA_SUCCESS;
    constructor(public payload?: any) { }
}

export class LoadDataFailAction implements Action {
    readonly type = LOAD_DATA_FAIL;
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

export class DeleteTransaction implements Action {
    readonly type = DELETE_TRANSACTION;
    constructor(public payload?: any){ }
}

export class DeleteTransactionSuccess implements Action {
    readonly type = DELETE_TRANSACTION_SUCCESS;
    constructor(public payload?: any){ }
}

export class DeleteTransactionFail implements Action {
    readonly type = DELETE_TRANSACTION_FAIL;
    constructor(public payload?: any){ }
}

export type ActionType = LoadDataAction | LoadDataSuccessAction | LoadDataFailAction
| AddTransactionAction | AddTransactionSuccessAction | AddTransactionFailAction
| GetTransactionAction | GetTransactionSuccessAction | GetTransactionFailAction
| DeleteTransaction | DeleteTransactionSuccess | DeleteTransactionFail;