import { Action } from "@ngrx/store";
import { User } from "../models/user.model";

export enum AuthActionTypes {
  SaveProfile = '[AUTH] SaveProfile',
  ResetAuth = 'RESET AUTH'
}

export class SaveProfile implements Action {
  readonly type = AuthActionTypes.SaveProfile
  constructor(public payload:User) {}
}

export class ResetAuth implements Action {
  readonly type = AuthActionTypes.ResetAuth
}

export type AuthActionsUnion = SaveProfile | ResetAuth;
