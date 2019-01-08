import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, ActionsSubject } from "@ngrx/store";
import { TransactionState } from './transaction.reducer';
import { Observable } from "rxjs";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromTransaction from './transaction.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as TransactionActions from './transaction.actions';
import { Transaction } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
// import { ToastrService } from "ngx-toastr";

@Injectable()
export class TransactionEffects {

    constructor(
        private actions$: Actions,
        private porftolioService: TransactionService,
        private router: Router
    ) { }


//     @Effect()
//     loadTransactions$: Observable<Action> = this.actions$.pipe(
//         ofType(TransactionActions.LOAD_DATA),
//             switchMap((action) =>
//             this.TransactionService.fetchTransactions().pipe(
//                     map(data => new fromTransaction.LoadDataSuccessAction(data)),
//                     catchError(err => {
//                         this.toasterService.error(err.message);
//                         return of(new fromTransaction.LoadDataFailAction({ error: err.message }))
//                     }),
//                 ),
//             ),
//       );

//   @Effect()
//   addTransaction$: Observable<Action> = this.actions$.pipe(
//     ofType(TransactionActions.ADD_Transaction),
//     map((action: any) => action.payload),
//     switchMap((Transaction) => this.porftolioService.addTransaction(Transaction)),
//     map(Transaction => {
//         this.toasterService.success('Transaction Added Successfully');
//         return new fromTransaction.AddTransactionSuccessAction(Transaction);
//     }),
//     catchError(err => {
//       this.toasterService.error(err.message);
//       return of(new fromTransaction.AddTransactionFailAction({error: err}));
//     })
//   );

//   @Effect()
//   getTransaction$: Observable<Action> = this.actions$.pipe(
//     ofType(TransactionActions.GET_Transaction),
//     map((action: any) => action.payload),
//     switchMap((TransactionId) => this.porftolioService.getTransaction(TransactionId)),
//     map(Transaction => {
//         return new fromTransaction.GetTransactionSuccessAction(Transaction);
//     }),
//     catchError(err => {
//       this.toasterService.error(err.message);
//       return of(new fromTransaction.GetTransactionFailAction({error: err}));
//     })
//   );

//   @Effect()
//   deleteTransaction$: Observable<Action> = this.actions$.pipe(
//     ofType(TransactionActions.DELETE_Transaction),
//     map((action: any) => action.payload),
//     switchMap((TransactionId) => this.porftolioService.deleteTransaction(TransactionId)),
//     map(Transaction => {
//         this.toasterService.success('Transaction Deleted Successfully');
//         return new fromTransaction.DeleteTransactionSuccess(Transaction);
//     }),
//     catchError(err => {
//       this.toasterService.error(err.message);
//       return of(new fromTransaction.DeleteTransactionFail({error: err}));
//     })
//   );

}