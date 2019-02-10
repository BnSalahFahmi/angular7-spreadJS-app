import * as transactionTabsActions from './transactionTabs.actions';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { TransactionMgtState } from '.';
import * as fromTransaction from './transaction.reducer';

export interface TabState {
    id: number;
    name: string;
    type: string;
    transactionId: number
}

export const INITIAL_STATE: TabState = {
    id: 0,
    name: '',
    type: '',
    transactionId: 0
}

export interface TransactionTabState {
    transactionList: fromTransaction.TransactionState
}

export const reducers: ActionReducerMap<TransactionTabState> = {
    transactionList: fromTransaction.reducer,
};

// export function reducer(state = INITIAL_STATE, action: any): TabState {
//     debugger;
//     if (!action) return state;
//     switch (action.type) {
//         case transactionTabsActions.ActionTypes.OPEN_TAB: {
//             return state;
//         }
//         case transactionTabsActions.ActionTypes.OPEN_TAB_SUCCESS: {
//             if (action.payload.type === 0)
//                 //return [...state, action.payload.tab];
//                 return state;
//             else if (action.payload.type === 1) {
//                 //let tabs: any[] = [...state];
//                 // let index: any;
//                 // for (let i = 0; i < tabs.length; i++) {
//                 //     if (tabs[i].id === action.payload.tab.id)
//                 //         index = i
//                 // }
//                 // tabs.splice(index, 1, action.payload.tab);
//                 return state;
//                 //return tabs;
//             }
//             else
//                 return state;
//         }
//         case transactionTabsActions.ActionTypes.OPEN_TAB_FAIL: {
//             return state;
//         }
//         default:
//             return state;
//     }
// }


export const selectTransactionMgtFeatureState = createFeatureSelector<TransactionMgtState>('TransactionFeature');

export const selectTransactionTabState = createSelector(selectTransactionMgtFeatureState, (state: any) => state.TabState);
