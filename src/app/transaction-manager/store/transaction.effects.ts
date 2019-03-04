import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, ActionsSubject } from "@ngrx/store";
import { State } from './transaction.reducer';
import { Observable } from "rxjs";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromTransaction from './transaction.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as TransactionActions from './transaction.actions';
import { Transaction } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class TransactionEffects {

    constructor(
        private actions$: Actions,
        private transactionService: TransactionService,
        private router: Router,
        private toasterService: ToastrService
    ) { }


    @Effect()
    loadTransactions$: Observable<Action> = this.actions$.pipe(
        ofType(TransactionActions.LOAD_TRANSACTION_DATA),
        switchMap((action) =>
            this.transactionService.fetchTransactions().pipe(
                map(data => new fromTransaction.LoadTransactionDataSuccessAction(data)),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromTransaction.LoadTransactionDataFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    addTransaction$: Observable<Action> = this.actions$.pipe(
        ofType(TransactionActions.ADD_TRANSACTION),
        switchMap((transaction) =>
            this.transactionService.addTransaction(transaction).pipe(
                map(data => {
                    this.toasterService.success('Transaction Added Successfully');
                    return new fromTransaction.AddTransactionSuccessAction(data)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromTransaction.AddTransactionFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    updateTransaction$: Observable<Action> = this.actions$.pipe(
        ofType(TransactionActions.UPDATE_TRANSACTION),
        switchMap((transaction) =>
            this.transactionService.updateTransaction(transaction).pipe(
                map(data => {
                    this.toasterService.success('Transaction Updated Successfully');
                    return new fromTransaction.UpdateTransactionSuccessAction(data)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromTransaction.UpdateTransactionFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    getTransaction$: Observable<Action> = this.actions$.pipe(
        ofType(TransactionActions.GET_TRANSACTION),
        switchMap((transactionId) =>
            this.transactionService.getTransaction(transactionId).pipe(
                map(data => {
                    return new fromTransaction.GetTransactionSuccessAction(transaction)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromTransaction.GetTransactionFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    deleteTransaction$: Observable<Action> = this.actions$.pipe(
        ofType(TransactionActions.DELETE_TRANSACTION),
        switchMap((transactionId) =>
            this.transactionService.deleteTransaction(transactionId).pipe(
                map(data => {
                    this.toasterService.success('Transaction Deleted Successfully');
                    return new fromTransaction.DeleteTransactionSuccessAction(data)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromTransaction.DeleteTransactionFailAction({ error: err.message }))
                }),
            ),
        ),
    );

}