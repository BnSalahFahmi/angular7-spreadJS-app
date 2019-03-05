import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTransactionTabs from '../../../transaction-manager/store/index';
import * as transactionTabsActions from '../../../transaction-manager/store/transactionTabs.actions';
import * as transactionActions from '../../../transaction-manager/store/transaction.actions';
import { collapse } from '../../../shared/animation/collapse-animate';
import { mockTransaction } from '../../../transaction-manager/models/transaction.model';

@Component({
  selector: 'file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  animations: [collapse]
})
export class FileTreeComponent implements OnInit {
  @Input() model: any;
  @Input() isChild: boolean;
  constructor(private store: Store<fromTransactionTabs.ProjectMgtState> ) { }

  ngOnInit() {
    this.model.forEach(element => {
      element.isSelect ? element.toggle = 'on' : element.toggle = 'init';
    });
  }

  private toggleItem(item, children) {
    if (children)
      item.toggle === 'on' ? item.toggle = 'off' : item.toggle = 'on';
    else {
      this.delegateOpenTabDetails(item);
    }
  }

  delegateOpenTabDetails(tab: any, event?: Event) {
    let transaction = mockTransaction();
    this.store.dispatch(new transactionTabsActions.OpenTabAction({
      type: 0,
      tab: {
        id: 1,
        type: "TRANSACTION",
        heading: tab.name,
        active: true,
        closable: true,
        transaction: transaction
      }
    }));
  }

}
