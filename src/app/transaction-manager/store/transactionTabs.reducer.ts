import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransaction from './transaction.reducer';
import * as TransactionTabsActions from './transactionTabs.actions';
import * as TransactionActions from './transaction.actions';
import * as fromRoot from '../../reducers';
import { TransactionTab } from '../models/transaction-tab.model';
import { TabsetComponent } from 'ngx-bootstrap';

export const TRANSACTIONTABS_INITIAL_STATE = [];

export function reducer(state = TRANSACTIONTABS_INITIAL_STATE, action: any): TransactionTab[] {
    if (!action) return state;
    switch (action.type) {
        case TransactionTabsActions.ActionTypes.OPEN_TAB: {
            return state;
        }
        case TransactionTabsActions.ActionTypes.OPEN_TAB_SUCCESS: {
            if (action.payload.type === 0) {
                let tabs: any[] = [...state];
                var activeTabIndex = tabs.findIndex(tab => tab && tab.active == true);
                if (activeTabIndex != -1) {
                    let newTab = {
                        id: tabs[activeTabIndex].id,
                        type: tabs[activeTabIndex].type,
                        heading: tabs[activeTabIndex].heading,
                        active: false,
                        closable: tabs[activeTabIndex].closable,
                        transaction: tabs[activeTabIndex].transaction
                    }
                    tabs[activeTabIndex] = newTab;
                }
                return [...tabs, action.payload.tab];
            }
            else if (action.payload.type === 1) {
                let tabs: any[] = [...state];
                const index = state.findIndex(tab => tab.id === action.payload.tabId);
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
            const index = state.findIndex(tab => tab.id === action.payload.tabId);
            tabs.splice(index, 1);
            // if (index != 0 && index != -1) {
            //     let newTab = {
            //         id: tabs[index].id,
            //         type: tabs[index].type,
            //         heading: tabs[index].heading,
            //         active: true,
            //         closable: tabs[index].closable,
            //         transaction: tabs[index].transaction
            //     }
            //     tabs[index] = newTab;
            // }
            return tabs;
        }
        case TransactionTabsActions.ActionTypes.SET_ACTIVE_TAB: {
            debugger;
            let tabs: any[] = [...state];
            var activeTabIndex = tabs.findIndex(tab => tab && tab.active == true);
            const index = tabs.findIndex(tab => tab.id === action.payload.tabId);
            if (index != -1 && activeTabIndex != -1) {
                let newActiveTab = {
                    id: tabs[index].id,
                    type: tabs[index].type,
                    heading: tabs[index].heading,
                    active: true,
                    closable: tabs[index].closable,
                    transaction: tabs[index].transaction
                }
                let newTab = {
                    id: tabs[activeTabIndex].id,
                    type: tabs[activeTabIndex].type,
                    heading: tabs[activeTabIndex].heading,
                    active: false,
                    closable: tabs[activeTabIndex].closable,
                    transaction: tabs[activeTabIndex].transaction
                }
                tabs[index] = newActiveTab;
                tabs[activeTabIndex] = newTab;
            }
            return tabs;
        }
        // case TransactionTabsActions.ActionTypes.UPDATE_TAB_INFOS: {
        //     let tabs: any[] = [...state];
        //     let index: any;
        //     for (let i = 0; i < tabs.length; i++) {
        //         if (tabs[i].id === action.payload.tabId) {
        //             index = i;
        //             tabs[i].transaction = action.payload.transaction;
        //         }
        //     }
        //     return tabs;
        // }
        // case TransactionTabsActions.ActionTypes.UPDATE_TAB_INFOS_SUCCESS: {
        //     let tabs: any[] = [...state];
        //     // for (let i = 0; i < tabs.length; i++) {
        //     //     if (tabs[i].id === action.payload.tabId) {
        //     //         index = i;
        //     //         tabs[i].transaction = action.payload.transaction;
        //     //     }
        //     // }
        //     const index = state.findIndex(tab => tab.id === action.payload.tabId);
        //     return tabs;
        // }
        // case TransactionTabsActions.ActionTypes.UPDATE_TAB_INFOS_FAIL: {
        //     let tabs: any[] = [...state];
        //     let index: any;
        //     for (let i = 0; i < tabs.length; i++) {
        //         if (tabs[i].id === action.payload.tabId) {
        //             index = i;
        //             tabs[i].transaction = action.payload.transaction;
        //         }
        //     }
        //     return tabs;
        // }
        default:
            return state;
    }
}