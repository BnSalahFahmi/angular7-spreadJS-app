import { AuthActionsUnion, AuthActionTypes } from "./auth.action";
import { User } from "../models/user.model";

export interface State {
  profile: User
}

const initialState:State = {
  profile: null
};

export function reducer(state:State = initialState, action: AuthActionsUnion) : State {
  switch(action.type) {
    case AuthActionTypes.SaveProfile: {
      return {
        ...state,
        profile: action.payload
      }
    }

    case AuthActionTypes.ResetAuth: {
      return {
        ...initialState
      }
    }

    default: {
      return state
    }
  }
}

export const getProfile = (state:State) => state.profile;
export const getIsAuth = (state:State) => (state.profile != null);
