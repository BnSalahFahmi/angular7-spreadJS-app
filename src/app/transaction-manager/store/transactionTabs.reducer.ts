import * as TransactionTabsActions from './transactionTabs.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionMgtState } from '.';

export interface TabState {
    id: number;
    name: string;
    type: string;
    TransactionId: number
}

export const INITIAL_STATE: TabState = {
    id: 0,
    name: '',
    type: '',
    TransactionId: 0
}

export function reducer(state = [] , action: any): TabState[] {
    if (!action) return state;
    switch (action.type) {
        case TransactionTabsActions.ActionTypes.OPEN_TAB: {
            return state;
        }
        case TransactionTabsActions.ActionTypes.OPEN_TAB_SUCCESS: {
            debugger;
            if (action.payload.type === 0)
                return [...state, action.payload.tab];
            else if (action.payload.type === 1) {
                let tabs: any[] = [...state];
                let index: any;
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].id === action.payload.tab.id)
                        index = i
                }
                tabs.splice(index, 1, action.payload.tab);
                return tabs;
            }
            else
                return state;
        }
        case TransactionTabsActions.ActionTypes.OPEN_TAB_FAIL: {
            return state;
        }
        case TransactionTabsActions.ActionTypes.CLOSE_TAB: {
            state = state.filter(tab => tab.id !== action.payload.id);
            return state;
        }
    }
}


export const selectTransactionMgtFeatureState = createFeatureSelector<TransactionMgtState>('TransactionFeature');

export const selectTransactionTabState = createSelector(selectTransactionMgtFeatureState, (state: any) => state.TabState);
