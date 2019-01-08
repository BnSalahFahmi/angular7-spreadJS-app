import { Action } from '@ngrx/store';
import { type } from '../../shared/utilityHelpers';

export const ActionTypes = {
  OPEN_TAB: type('[Transaction Tabs] Open Tab'),
  OPEN_TAB_SUCCESS: type('[Transaction Tabs] Open Tab Success'),
  OPEN_TAB_FAIL: type('[Transaction Tabs] Open Tab Fail'),
  CLOSE_TAB: type('[Transaction Tabs] Close Tab'),
};


export class CloseTabAction implements Action {
  type = ActionTypes.CLOSE_TAB;
  constructor(public payload: any) { }
}


export class OpenTabAction implements Action {
  type = ActionTypes.OPEN_TAB;
  constructor(public payload: any) { }
}

export class OpenTabSuccessAction implements Action {
  type = ActionTypes.OPEN_TAB_SUCCESS;
  constructor(public payload: any) { }
}

export class OpenTabFailAction implements Action {
  type = ActionTypes.OPEN_TAB_FAIL;
  constructor(public payload: any = null) { }
}



export type Actions = OpenTabAction
  | OpenTabSuccessAction
  | OpenTabFailAction
  | CloseTabAction