import * as actions from './Structure.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectMgtState } from '.';
import { Structure } from '../models/Structure.model';
import * as StructureActions from './Structure.actions';

export interface State {
    data: any;
    selected: Structure;
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
        * GET all Structures actions
        ************************/

        case StructureActions.LOAD_STRUCTURE_DATA: {
            return {
                ...state,
                selected: null,
                done: false,
                error: null
            };
        }

        case StructureActions.LOAD_STRUCTURE_DATA_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                done: true,
                selected: null,
                error: null
            };
        }

        case StructureActions.LOAD_STRUCTURE_DATA_FAIL: {
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };
        }

        /*************************
        * GET Structure by id actions
        ************************/
        case StructureActions.GET_STRUCTURE:
            return {
                ...state,
                done: false,
                selected: null,
                error: null
            };
        case StructureActions.GET_STRUCTURE_SUCCESS:
            return {
                ...state,
                selected: action.payload,
                done: true,
                error: null
            };
        case StructureActions.GET_STRUCTURE_FAIL:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };

        /*************************
        * ADD Structure actions
        ************************/
        case StructureActions.ADD_STRUCTURE: {
            return {
                ...state,
                selected: action.payload,
                done: false,
                error: null
            };
        }

        case StructureActions.ADD_STRUCTURE_SUCCESS: {
            const newStructure = {
                ...state.selected,
                id: action.payload
            };
            const data = [
                ...state.data,
                newStructure
            ];
            return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
            };
        }

        case StructureActions.ADD_STRUCTURE_FAIL: {
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
        }

        /*************************
        * UPDATE Structure actions
        ************************/

        case StructureActions.UPDATE_STRUCTURE: {
            return {
                ...state,
                selected: action.payload,
                done: false,
                error: null
            };
        }

        case StructureActions.UPDATE_STRUCTURE_SUCCESS: {
            const index = state.data.findIndex(h => h.id === state.selected.id);
            if (index >= 0) {
                const data = [
                    ...state.data.slice(0, index),
                    state.selected,
                    ...state.data.slice(index + 1)
                ];
                return {
                    ...state,
                    data,
                    done: true,
                    selected: null,
                    error: null
                };
            }
        }

        case StructureActions.UPDATE_STRUCTURE_FAIL: {
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };
        }

        /*************************
        * DELETE Structure actions
        ************************/

        case StructureActions.DELETE_STRUCTURE: {
            const selected = state.data.find(h => h.id === action.payload);
            return {
                ...state,
                selected,
                done: false,
                error: null
            };
        }

        case StructureActions.DELETE_STRUCTURE_SUCCESS: {
            const data = state.data.filter(h => h.id !== state.selected.id);
            return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
            };
        }

        case StructureActions.DELETE_STRUCTURE_FAIL: {
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
        }

        /*************************
        * SEARCH Structure actions
        ************************/

        case StructureActions.SEARCH: {
            return state;
        }

        case StructureActions.SEARCH_COMPLETED: {
            return state;
        }

        case StructureActions.SEARCH_FAILED: {
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

export const selectStructureMgtFeatureState = createFeatureSelector<ProjectMgtState>('projectMgtFeature');

//export const selectStructureState = createSelector(selectStructureMgtFeatureState, (state: any) => state.StructureList);