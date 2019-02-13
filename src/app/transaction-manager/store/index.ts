import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransaction from './transaction.reducer';
import * as TransactionTabsActions from './transactionTabs.actions';
import * as TransactionActions from './transaction.actions';
import * as fromRoot from '../../reducers';
import { TransactionTab } from '../models/transaction-tab.model';
import { TabsetComponent } from 'ngx-bootstrap';
import * as fromTransactionTabs from './transactionTabs.reducer';

export interface State extends fromRoot.State {
    transactionFeature: TransactionMgtState
}

export interface TransactionMgtState {
    transactionTabs: TransactionTab[],
    transactionList: fromTransaction.TransactionState,
}

export const reducers: ActionReducerMap<TransactionMgtState> = ({
    transactionTabs: fromTransactionTabs.reducer,
    transactionList: fromTransaction.reducer,
});


export const selectTransactionMgtFeatureState = createFeatureSelector<TransactionMgtState>('TransactionFeature');

export const selectTransactionTabs = createSelector(selectTransactionMgtFeatureState, (state: any) => state.transactionTabs);

export const selectActiveTab = createSelector(selectTransactionMgtFeatureState, (state: any) => {
    return state.transactionTabs.find(function (tab) {
        return tab && tab.active == true;
    });
});

export const selectActiveTransaction = createSelector(selectTransactionMgtFeatureState, (state: any) => {
    var activeTab = state.transactionTabs.find(function (tab) {
        return tab && tab.active == true;
    });
    if (activeTab)
        return activeTab.transaction;
    else
        return null;
});

export const selectTransactionList = createSelector(selectTransactionMgtFeatureState, (state: any) => state.TransactionList);