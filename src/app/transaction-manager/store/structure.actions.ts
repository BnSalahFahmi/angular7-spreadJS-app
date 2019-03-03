import { Action } from '@ngrx/store';
import { type } from '../../shared/utilityHelpers';
import { ShowLoader, HideLoader } from '../../shared/decorators';
import { Structure } from '../models/Structure.model';

export const LOAD_STRUCTURE_DATA = '[Structure] Load Structure Data';
export const LOAD_STRUCTURE_DATA_SUCCESS= '[Structure] Load Structure Data Success';
export const LOAD_STRUCTURE_DATA_FAIL= '[Structure] Load Structure Data Fail';

export const ADD_STRUCTURE= '[Structure] Add';
export const ADD_STRUCTURE_SUCCESS= '[Structure] Add Success';
export const ADD_STRUCTURE_FAIL= '[Structure] Add Fail';

export const UPDATE_STRUCTURE= '[Structure] Update';
export const UPDATE_STRUCTURE_SUCCESS= '[Structure] Update Success';
export const UPDATE_STRUCTURE_FAIL= '[Structure] Update Fail';

export const GET_STRUCTURE= '[Structure] Get Structure';
export const GET_STRUCTURE_SUCCESS= '[Structure] Get Structure Success';
export const GET_STRUCTURE_FAIL= '[Structure] Get Structure Fail';

export const DELETE_STRUCTURE= '[Structure] Delete';
export const DELETE_STRUCTURE_SUCCESS= '[Structure] Delete Success';
export const DELETE_STRUCTURE_FAIL= '[Structure] Delete Fail';

export const SEARCH = '[Structure] Search';
export const SEARCH_COMPLETED =  '[Structure] Search Completed';
export const SEARCH_FAILED =  '[Structure] Search Failed';

@ShowLoader()
export class LoadStructureDataAction implements Action {
    readonly type = LOAD_STRUCTURE_DATA;
    constructor(public payload?: any) { }
}

@HideLoader(LOAD_STRUCTURE_DATA)
export class LoadStructureDataSuccessAction implements Action {
    readonly type = LOAD_STRUCTURE_DATA_SUCCESS;
    constructor(public payload?: any) { }
}

@HideLoader(LOAD_STRUCTURE_DATA)
export class LoadStructureDataFailAction implements Action {
    readonly type = LOAD_STRUCTURE_DATA_FAIL;
    constructor(public payload?: any) { }
}

export class AddStructureAction implements Action {
    readonly type = ADD_STRUCTURE;
    constructor(public payload?: any) { }
}

export class AddStructureSuccessAction implements Action {
    readonly type = ADD_STRUCTURE_SUCCESS;
    constructor(public payload?: any) { }
}

export class AddStructureFailAction implements Action {
    readonly type = ADD_STRUCTURE_FAIL;
    constructor(public payload?: any) { }
}

export class UpdateStructureAction implements Action {
    readonly type = UPDATE_STRUCTURE;
    constructor(public payload?: any) { }
}

export class UpdateStructureSuccessAction implements Action {
    readonly type = UPDATE_STRUCTURE_SUCCESS;
    constructor(public payload?: any) { }
}

export class UpdateStructureFailAction implements Action {
    readonly type = UPDATE_STRUCTURE_FAIL;
    constructor(public payload?: any) { }
}

export class GetStructureAction implements Action {
    readonly type = GET_STRUCTURE;
    constructor(public payload?: any) { }
}

export class GetStructureSuccessAction implements Action {
    readonly type = GET_STRUCTURE_SUCCESS;
    constructor(public payload?: any) { }
}

export class GetStructureFailAction implements Action {
    readonly type = GET_STRUCTURE_FAIL;
    constructor(public payload?: any) { }
}

export class DeleteStructureAction implements Action {
    readonly type = DELETE_STRUCTURE;
    constructor(public payload?: any){ }
}

export class DeleteStructureSuccessAction implements Action {
    readonly type = DELETE_STRUCTURE_SUCCESS;
    constructor(public payload?: any){ }
}

export class DeleteStructureFailAction implements Action {
    readonly type = DELETE_STRUCTURE_FAIL;
    constructor(public payload?: any){ }
}

export class SearchStructureAction implements Action {
    readonly type = SEARCH;
    constructor(public payload?: any) { }
}

export class SearchStructureSuccessAction implements Action {
    readonly type = SEARCH_COMPLETED;
    constructor(public payload?: any[]) { }
}

export class SearchStructureFailAction implements Action {
    readonly type = SEARCH_FAILED;
    constructor(public payload?: any) { }
}

export type ActionType = LoadStructureDataAction | LoadStructureDataSuccessAction | LoadStructureDataFailAction
| AddStructureAction | AddStructureSuccessAction | AddStructureFailAction
| UpdateStructureAction | UpdateStructureSuccessAction | UpdateStructureFailAction
| GetStructureAction | GetStructureSuccessAction | GetStructureFailAction
| DeleteStructureAction | DeleteStructureSuccessAction | DeleteStructureFailAction
| SearchStructureAction | SearchStructureSuccessAction | SearchStructureFailAction;