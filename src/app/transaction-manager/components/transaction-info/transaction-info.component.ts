import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { Store } from '@ngrx/store';
import * as transactionActions from '../../store/transaction.actions';
import * as fromTransaction from '../../store/transaction.reducer';

@Component({
  selector: 'transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit {

  @Input() transaction : Transaction;

  constructor(private store: Store<fromTransaction.TransactionState>) { }

  ngOnInit() {
  }

  onSaveTransaction(){
    this.store.dispatch(new transactionActions.LoadDataAction());
  }

  onSaveAsTransaction(){

  }

}
