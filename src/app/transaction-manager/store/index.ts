import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransactionTabs from './transactionTabs.reducer';
import * as fromTransaction from './transaction.reducer';
import * as TransactionTabsActions from './transactionTabs.actions';
import * as TransactionActions from './transaction.actions';
import * as fromRoot from '../../reducers';
import * as fromTransactionTab from './transactionTabs.reducer';

export interface State extends fromRoot.State {
    TransactionFeature: TransactionMgtState
}

export interface TransactionMgtState {
    TransactionTabs: any[],
    TransactionList: fromTransaction.TransactionState,
}

export const TRANSACTIONTABS_INITIAL_STATE = []

export const reducers: ActionReducerMap<TransactionMgtState> = ({
    TransactionTabs: reducer,
    TransactionList: fromTransaction.reducer,
});

export function reducer(state = TRANSACTIONTABS_INITIAL_STATE, action: any): any[] {
    debugger;
    if (!action) return state;
    switch (action.type) {
        case TransactionTabsActions.ActionTypes.OPEN_TAB: {
            return state;
        }
        case TransactionTabsActions.ActionTypes.OPEN_TAB_SUCCESS: {
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
            let tabs: any[] = [...state];
            let index: any;
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].id === action.payload.tabId)
                    index = i
            }
            tabs.splice(index, 1);
            return tabs;
        }
        default:
        return state;
    }
}

export const selectTransactionMgtFeatureState = createFeatureSelector<TransactionMgtState>('TransactionFeature');

export const selectTransactionTabs = createSelector(selectTransactionMgtFeatureState, (state: any) => state.TransactionTabs);

export const selectTransactionList = createSelector(selectTransactionMgtFeatureState, (state: any) => state.TransactionList);