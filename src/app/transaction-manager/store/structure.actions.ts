import { Action } from '@ngrx/store';
import { type } from '../../shared/utilityHelpers';
import { ShowLoader, HideLoader } from '../../shared/decorators';
import { Structure } from '../models/Structure.model';

export const SEARCH =           '[Structure] Search';
export const SEARCH_COMPLETED =  '[Structure] Search Completed';
export const SEARCH_FAILED =  '[Structure] Search Failed';
    
export const LOAD_STRUCTURE_DATA = '[Structure] Load Structure Data';
export const LOAD_STRUCTURE_DATA_SUCCESS= '[Structure] Load Structure Data Success';
export const LOAD_STRUCTURE_DATA_FAIL= '[Structure] Load Structure Data Fail';

export const ADD_STRUCTURE= '[Structure] Add';
export const ADD_STRUCTURE_SUCCESS= '[Structure] Add Success';
export const ADD_STRUCTURE_FAIL= '[Structure] Add Fail';

export const GET_STRUCTURE= '[Structure] Get Structure';
export const GET_STRUCTURE_SUCCESS= '[Structure] Get Structure Success';
export const GET_STRUCTURE_FAIL= '[Structure] Get Structure Fail';

export const DELETE_STRUCTURE= '[Structure] Delete';
export const DELETE_STRUCTURE_SUCCESS= '[Structure] Delete Success';
export const DELETE_STRUCTURE_FAIL= '[Structure] Delete Fail';

export class SearchAction implements Action {
    readonly type = SEARCH;
    constructor(public payload?: any) { }
}

export class SearchCompletedAction implements Action {
    readonly type = SEARCH_COMPLETED;
    constructor(public payload?: any[]) { }
}

export class SearchFailedAction implements Action {
    readonly type = SEARCH_FAILED;
    constructor(public payload?: any) { }
}

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

export class DeleteStructure implements Action {
    readonly type = DELETE_STRUCTURE;
    constructor(public payload?: any){ }
}

export class DeleteStructureSuccess implements Action {
    readonly type = DELETE_STRUCTURE_SUCCESS;
    constructor(public payload?: any){ }
}

export class DeleteStructureFail implements Action {
    readonly type = DELETE_STRUCTURE_FAIL;
    constructor(public payload?: any){ }
}

export type ActionType = LoadStructureDataAction | LoadStructureDataSuccessAction | LoadStructureDataFailAction
| AddStructureAction | AddStructureSuccessAction | AddStructureFailAction
| GetStructureAction | GetStructureSuccessAction | GetStructureFailAction
| DeleteStructure | DeleteStructureSuccess | DeleteStructureFail;