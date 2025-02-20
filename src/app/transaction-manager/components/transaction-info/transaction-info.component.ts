import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { Store, select } from '@ngrx/store';
import * as transactionActions from '../../store/transaction.actions';
import * as fromTransactionTabs from '../../store/index';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit {

  @Input() transaction : Transaction;

  constructor(private store: Store<fromTransactionTabs.ProjectMgtState>, private snackbarService: SnackBarService) {
  }

  ngOnInit() {
  }

  onSaveTransaction() {
    this.store.dispatch(new transactionActions.UpdateTransactionAction(this.transaction));
  }

  onSaveAsTransaction() {
    this.snackbarService.dataBusChanged({title: "Test", value: "Saved !"});
  }

}
