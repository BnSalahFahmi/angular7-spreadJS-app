import * as actions from './transaction.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectMgtState } from '.';
import { Transaction } from '../models/transaction.model';
import * as TransactionActions from './transaction.actions';

export interface State {
    data: any;
    selected: Transaction;
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
        * GET all Transactions actions
        ************************/

        case TransactionActions.LOAD_TRANSACTION_DATA: {
            return {
                ...state,
                done: false,
                selected: null,
                error: null
            };
        }

        case TransactionActions.LOAD_TRANSACTION_DATA_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                done: true,
                selected: null,
                error: null
            };
        }

        case TransactionActions.LOAD_TRANSACTION_DATA_FAIL: {
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };
        }

        /*************************
        * GET Transaction by id actions
        ************************/
        case TransactionActions.GET_TRANSACTION:
            return {
                ...state,
                done: false,
                selected: null,
                error: null
            };
        case TransactionActions.GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                selected: action.payload,
                done: true,
                error: null
            };
        case TransactionActions.GET_TRANSACTION_FAIL:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };

        /*************************
      * ADD Transaction actions
      ************************/

        case TransactionActions.ADD_TRANSACTION: {
            return {
                ...state,
                selected: action.payload,
                done: false,
                error: null
            };
        }

        case TransactionActions.ADD_TRANSACTION_SUCCESS: {
            const newTransaction = {
                ...state.selected,
                id: action.payload
            };
            const data = [
                ...state.data,
                newTransaction
            ];
            return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
            };
        }

        case TransactionActions.ADD_TRANSACTION_FAIL: {
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
        }

        /*************************
        * UPDATE Transaction actions
        ************************/

        case TransactionActions.UPDATE_TRANSACTION: {
            return {
                ...state,
                selected: action.payload,
                done: false,
                error: null
            };
        }

        case TransactionActions.UPDATE_TRANSACTION_SUCCESS: {
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

        case TransactionActions.UPDATE_TRANSACTION_FAIL: {
            return {
                ...state,
                done: true,
                selected: null,
                error: action.payload
            };
        }

        /*************************
        * DELETE Transaction actions
        ************************/

        case TransactionActions.DELETE_TRANSACTION: {
            const selected = state.data.find(h => h.id === action.payload);
            return {
                ...state,
                selected,
                done: false,
                error: null
            };
        }

        case TransactionActions.DELETE_TRANSACTION_SUCCESS: {
            const data = state.data.filter(h => h.id !== state.selected.id);
            return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true
            };
        }

        case TransactionActions.DELETE_TRANSACTION_FAIL: {
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

/*************************
 * SELECTORS
 ************************/

export const selectProjectMgtFeatureState = createFeatureSelector<ProjectMgtState>('projectMgtFeature');

//export const selectTransactionState = createSelector(selectProjectMgtFeatureState, (state: any) => state.TransactionList);
