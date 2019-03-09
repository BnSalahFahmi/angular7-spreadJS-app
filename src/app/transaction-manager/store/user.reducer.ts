import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../core/models/user.model';
import { ProjectMgtState } from '.';

export interface State {
    data: any;
    selected: User;
    done: boolean;
    error?: Error;
}

export const INITIAL_STATE: State = {
    data: [],
    selected: null,
    done: false,
    error: null
}

/// Helper function to create new state object
const newState = (state, newData) => {
    return Object.assign({}, state, newData)
}

export function reducer(state = INITIAL_STATE, action: any): State {
    if (!action) return state;

    switch (action.type) {

        /*************************
        * INIT Users Data
        ************************/

        case UserActions.INIT_USERS: {
            return {
                ...state,
                selected: null,
                done: false,
                error: null
            };
        }

        case UserActions.INIT_USERS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                done: true,
                selected: null,
                error: null
            };
        }

        case UserActions.INIT_USERS_FAIL: {
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };
        }

        /*************************
        * SEARCH actions
        ************************/

        case UserActions.SEARCH: {
            return state;
        }

        case UserActions.SEARCH_COMPLETED: {
            return state;
        }

        case UserActions.SEARCH_FAILED: {
            return state;
        }

        default: {
            return state;
        }
    }
}

/*************************
 * SELECTORS
 ************************/

export const selecProjectMgtFeatureState = createFeatureSelector<ProjectMgtState>('userMgtFeature');

export const selectUsersList = createSelector(selecProjectMgtFeatureState, (state: ProjectMgtState) => state.users.data);
