import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as actions from './transactionTabs.actions'
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromTransactionTabs from './../store/index';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class TransactionTabsEffects {

    constructor(
        private actions$: Actions,
        private TransactionService: TransactionService,
        private toasterService: ToastrService,
        private router: Router,
        private appState$: Store<any>) { }

    @Effect()
    doOpenTab$: Observable<Action> = this.actions$.pipe(
        ofType(actions.ActionTypes.OPEN_TAB),
        map((action: any) => action.payload),
        switchMap(state => {
            if (state.tab.type === 'HOME') {
                return this.TransactionService
                    .fetchTransactions().pipe(
                        map(data => new actions.OpenTabSuccessAction({
                            type: state.type,
                            tab: { ...state.tab }
                        })), catchError(err => {
                            this.toasterService.error(err.message);
                            return of(new actions.OpenTabFailAction({ error: err.message }))
                        }));
            }
            else if (state.tab.type === 'TRANSACTION') {
                this.TransactionService.fetchTransactions()
                    .pipe(map(([mgaData, paData]) => new actions.OpenTabSuccessAction({
                        type: state.type,
                        tab: { ...state.tab, data: mgaData, paData }
                    })));

            } else if (state.tab.type === 'NEW TRANSACTION') {
                this.TransactionService.fetchTransactions()
                    .pipe(map(([mgaData, paData]) => new actions.OpenTabSuccessAction({
                        type: state.type,
                        tab: { ...state.tab, data: [] }
                    })));

            }
            return of(new actions.OpenTabSuccessAction(
                state
            ));
        }));

    // @Effect()
    // doCloseTab$: Observable<Action> = this.actions$.pipe(
    //        ofType(actions.ActionTypes.CLOSE_TAB),
    //        map((action: any) => action.payload),
    //        switchMap(state => {
    //             return of(new actions.CloseTabAction(
    //             state
    //         ));
    //        }));
}