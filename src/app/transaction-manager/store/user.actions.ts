import { Action } from '@ngrx/store';
import { ShowLoader, HideLoader } from '../../shared/decorators';

export const INIT_USERS = '[User] Init Users';
export const INIT_USERS_SUCCESS= '[User] Init Users Success';
export const INIT_USERS_FAIL= '[User] Init Users Fail';

export const SEARCH = '[User] Search';
export const SEARCH_COMPLETED =  '[User] Search Completed';
export const SEARCH_FAILED =  '[User] Search Failed';

@ShowLoader()
export class InitUsersAction implements Action {
    type = INIT_USERS;
    constructor(public payload?: any) { }
}

@HideLoader(INIT_USERS)
export class InitUsersSuccessAction implements Action {
    type = INIT_USERS_SUCCESS;
    constructor(public payload?: any) { }
}

@HideLoader(INIT_USERS)
export class InitUsersFailAction implements Action {
    type = INIT_USERS_FAIL;
    constructor(public payload?: any) { }
}


@ShowLoader()
export class SearchStructureAction implements Action {
    readonly type = SEARCH;
    constructor(public payload?: any) { }
}

@HideLoader(SEARCH)
export class SearchStructureSuccessAction implements Action {
    readonly type = SEARCH_COMPLETED;
    constructor(public payload?: any[]) { }
}

@HideLoader(SEARCH)
export class SearchStructureFailAction implements Action {
    readonly type = SEARCH_FAILED;
    constructor(public payload?: any) { }
}

export type ActionType = InitUsersAction | InitUsersSuccessAction | InitUsersFailAction
| SearchStructureAction | SearchStructureSuccessAction | SearchStructureFailAction;