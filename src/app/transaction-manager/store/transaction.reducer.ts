import * as actions from './transaction.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectMgtState } from '.';
import { Transaction } from '../models/transaction.model';
import * as TransactionActions from './transaction.actions';

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
        * GET all Transactions actions
        ************************/ 

        case TransactionActions.LOAD_TRANSACTION_DATA: {
            return Object.assign({}, state, {
                loading: true,
                loaded:  false,
                failed:  false,
                data: []
              });
        }

        case TransactionActions.LOAD_TRANSACTION_DATA_SUCCESS: {
            return Object.assign({}, state, {
                loaded:  true,
                loading: false,
                failed:  false,
                data:    action.payload
              });
        }

        case TransactionActions.LOAD_TRANSACTION_DATA_FAIL: {
            return Object.assign({}, state, {
                loaded:  true,
                loading: false,
                failed:  true,
                data:    []
              });
        }

        /*************************
        * GET Transaction by id actions
        ************************/
        // case TransactionActions.GET_TRANSACTION:
        //     return {
        //         ...state,
        //         done: false,
        //         selected: null,
        //         error: null
        //     };
        // case TransactionActions.GET_TRANSACTION_SUCCESS:
        //     return {
        //         ...state,
        //         selected: action.payload,
        //         done: true,
        //         error: null
        //     };
        // case TransactionActions.GET_TRANSACTION_FAIL:
        //     return {
        //         ...state,
        //         selected: null,
        //         done: true,
        //         error: action.payload
        //     };

        
        // case TransactionActions.ADD_TRANSACTION: {
        //     return {
        //         ...state,
        //         selected: action.payload,
        //         done: false,
        //         error: null
        //       };
        // }

        // /*************************
        // * ADD Transaction actions
        // ************************/

        // case TransactionActions.ADD_TRANSACTION_SUCCESS: {
        //     const newTransaction = {
        //         ...state.selected,
        //         id: action.payload
        //       };
        //       const data = [
        //         ...state.data,
        //         newTransaction
        //       ];
        //       return {
        //         ...state,
        //         data,
        //         selected: null,
        //         error: null,
        //         done: true
        //       };
        // }

        // case TransactionActions.ADD_TRANSACTION_FAIL: {
        //     return {
        //         ...state,
        //         selected: null,
        //         done: true,
        //         error: action.payload
        //       };
        // }

        // /*************************
        // * DELETE Transaction actions
        // ************************/

        // case TransactionActions.DELETE_TRANSACTION: {
        //     const selected = state.data.find(p => p.id === action.payload);
        //     return {
        //         ...state,
        //         selected,
        //         done: false,
        //         error: null
        //     };
        // }

        // case TransactionActions.DELETE_TRANSACTION_SUCCESS: {
        //     const data = state.data.filter(p => p.id !== state.selected.id);
        //     return {
        //         ...state,
        //         data,
        //         selected: null,
        //         error: null,
        //         done: true
        //     };
        // }

        // case TransactionActions.DELETE_TRANSACTION_FAIL: {
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

export const selectProjectMgtFeatureState = createFeatureSelector<ProjectMgtState>('projectMgtFeature');

export const selectTransactionState  = createSelector(selectProjectMgtFeatureState, (state: any) => state.TransactionList);

export const selectAllTransactions = createSelector(selectTransactionState, (state: ProjectMgtState) => state.transactionList);

// export const selectLoading = createSelector(selectTransactionState, (state: TransactionState) => !state.done);