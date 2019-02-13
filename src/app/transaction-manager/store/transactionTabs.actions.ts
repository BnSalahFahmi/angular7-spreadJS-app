import { Action } from '@ngrx/store';
import { type } from '../../shared/utilityHelpers';

export const ActionTypes = {
  OPEN_TAB: type('[Transaction Tabs] Open Tab'),
  OPEN_TAB_SUCCESS: type('[Transaction Tabs] Open Tab Success'),
  OPEN_TAB_FAIL: type('[Transaction Tabs] Open Tab Fail'),
  CLOSE_TAB: type('[Transaction Tabs] Close Tab'),
  SET_ACTIVE_TAB: type('[Transaction Tabs] Set Active Tab'),
  UPDATE_TAB_INFOS: type('[Transaction Tabs] Update Tab Infos'),
  UPDATE_TAB_INFOS_SUCCESS: type('[Transaction Tabs] Update Tab Infos Success'),
  UPDATE_TAB_INFOS_FAIL: type('[Transaction Tabs] Update Tab Infos Fail')
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

export class UpdateTabInfos implements Action {
  type = ActionTypes.UPDATE_TAB_INFOS;
  constructor(public payload: any) { }
}

export class UpdateTabInfosSuccess implements Action {
  type = ActionTypes.UPDATE_TAB_INFOS_SUCCESS;
}

export class UpdateTabInfosFail implements Action {
  type = ActionTypes.UPDATE_TAB_INFOS_FAIL;
  constructor(public payload: any) { }
}

export class SetActiveTab implements Action {
  type = ActionTypes.SET_ACTIVE_TAB;
  constructor(public payload: any) { }
}


export type Actions = OpenTabAction
  | OpenTabSuccessAction
  | OpenTabFailAction
  | CloseTabAction
  | UpdateTabInfos
  | UpdateTabInfosSuccess
  | UpdateTabInfosFail
  | SetActiveTab