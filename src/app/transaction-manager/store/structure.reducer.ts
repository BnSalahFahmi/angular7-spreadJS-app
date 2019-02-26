import * as actions from './Structure.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectMgtState } from '.';
import { Structure } from '../models/Structure.model';
import * as StructureActions from './Structure.actions';

export interface State {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    data: any;
}

export const INITIAL_STATE: State = {
    loading: false,
    loaded: false,
    failed: false,
    data: []
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
            return Object.assign({}, state, {
                loading: true,
                loaded:  false,
                failed:  false,
                data: []
              });
        }

        case StructureActions.LOAD_STRUCTURE_DATA_SUCCESS: {
            return Object.assign({}, state, {
                loaded:  true,
                loading: false,
                failed:  false,
                data:    action.payload
              });
        }

        case StructureActions.LOAD_STRUCTURE_DATA_FAIL: {
            return Object.assign({}, state, {
                loaded:  true,
                loading: false,
                failed:  true,
                data:    []
              });
        }

        /*************************
        * GET Structure by id actions
        ************************/
        // case StructureActions.GET_Structure:
        //     return {
        //         ...state,
        //         done: false,
        //         selected: null,
        //         error: null
        //     };
        // case StructureActions.GET_Structure_SUCCESS:
        //     return {
        //         ...state,
        //         selected: action.payload,
        //         done: true,
        //         error: null
        //     };
        // case StructureActions.GET_Structure_FAIL:
        //     return {
        //         ...state,
        //         selected: null,
        //         done: true,
        //         error: action.payload
        //     };

        
        // case StructureActions.ADD_Structure: {
        //     return {
        //         ...state,
        //         selected: action.payload,
        //         done: false,
        //         error: null
        //       };
        // }

        // /*************************
        // * ADD Structure actions
        // ************************/

        // case StructureActions.ADD_Structure_SUCCESS: {
        //     const newStructure = {
        //         ...state.selected,
        //         id: action.payload
        //       };
        //       const data = [
        //         ...state.data,
        //         newStructure
        //       ];
        //       return {
        //         ...state,
        //         data,
        //         selected: null,
        //         error: null,
        //         done: true
        //       };
        // }

        // case StructureActions.ADD_Structure_FAIL: {
        //     return {
        //         ...state,
        //         selected: null,
        //         done: true,
        //         error: action.payload
        //       };
        // }

        // /*************************
        // * DELETE Structure actions
        // ************************/

        // case StructureActions.DELETE_Structure: {
        //     const selected = state.data.find(p => p.id === action.payload);
        //     return {
        //         ...state,
        //         selected,
        //         done: false,
        //         error: null
        //     };
        // }

        // case StructureActions.DELETE_Structure_SUCCESS: {
        //     const data = state.data.filter(p => p.id !== state.selected.id);
        //     return {
        //         ...state,
        //         data,
        //         selected: null,
        //         error: null,
        //         done: true
        //     };
        // }

        // case StructureActions.DELETE_Structure_FAIL: {
        //     return {
        //         ...state,
        //         selected: null,
        //         done: true,
        //         error: action.payload
        //       };
        // }

        default: {
            return state;
        }
    }
}

/*************************
 * SELECTORS
 ************************/

export const selectStructureMgtFeatureState = createFeatureSelector<ProjectMgtState>('projectMgtFeature');

export const selectStructureState  = createSelector(selectStructureMgtFeatureState, (state: any) => state.StructureList);

export const selectAllStructures = createSelector(selectStructureState, (state: ProjectMgtState) => state.structureList);

// export const selectLoading = createSelector(selectStructureState, (state: StructureState) => !state.done);