import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransaction from './transaction.reducer';
import * as fromStructure from './structure.reducer';
import * as TransactionTabsActions from './transactionTabs.actions';
import * as TransactionActions from './transaction.actions';
import * as fromRoot from '../../reducers';
import { TransactionTab } from '../models/transaction-tab.model';
import { TabsetComponent } from 'ngx-bootstrap';
import * as fromTransactionTabs from './transactionTabs.reducer';

export interface State extends fromRoot.State {
    projectMgtFeature: ProjectMgtState
}

export interface ProjectMgtState {
    transactionTabs: TransactionTab[],
    transactionList: fromTransaction.State,
    structureList: fromStructure.State
}

export const reducers: ActionReducerMap<ProjectMgtState> = ({
    transactionTabs: fromTransactionTabs.reducer,
    transactionList: fromTransaction.reducer,
    structureList: fromStructure.reducer
});


export const selectProjectMgtFeatureState = createFeatureSelector<ProjectMgtState>('projectMgtFeature');

export const selectTransactionTabs = createSelector(selectProjectMgtFeatureState, (state: ProjectMgtState) => state.transactionTabs);

export const selectTransactionList = createSelector(selectProjectMgtFeatureState, (state: ProjectMgtState) => state.transactionList);

export const selectStructureList = createSelector(selectProjectMgtFeatureState, (state: ProjectMgtState) => state.structureList);

// export const selectActiveTab = createSelector(selectProjectMgtFeatureState, (state: any) => {
//     return state.transactionTabs.find(function (tab) {
//         return tab && tab.active == true;
//     });
// });

// export const selectActiveTransaction = createSelector(selectProjectMgtFeatureState, (state: any) => {
//     var activeTab = state.transactionTabs.find(function (tab) {
//         return tab && tab.active == true;
//     });
//     if (activeTab)
//         return activeTab.transaction;
//     else
//         return null;
// });