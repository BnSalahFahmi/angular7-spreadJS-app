import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { TransactionTab } from '../models/transaction-tab.model';
import * as fromUsers from '../../transaction-manager/store/user.reducer';
import * as fromTransactionTabs from './transactionTabs.reducer';

export interface State extends fromRoot.State {
    projectMgtFeature: ProjectMgtState
}

export interface ProjectMgtState {
    users: fromUsers.State,
    transactionTabs: TransactionTab[],
}

export const reducers: ActionReducerMap<ProjectMgtState> = ({
    users: fromUsers.reducer,
    transactionTabs: fromTransactionTabs.reducer,
});


export const selectProjectMgtFeatureState = createFeatureSelector<ProjectMgtState>('projectMgtFeature');

export const selectTransactionTabs = createSelector(selectProjectMgtFeatureState, (state: ProjectMgtState) => state.transactionTabs);

export const selectUsersList = createSelector(selectProjectMgtFeatureState, (state: ProjectMgtState) => state.users.data);