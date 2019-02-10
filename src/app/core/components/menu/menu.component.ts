import { Component, Input } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { collapse } from '../../../shared/animation/collapse-animate';
import { Store } from '@ngrx/store';
import * as fromTransactionTabs from '../../../transaction-manager/store/index';
import * as transactionTabsActions from '../../../transaction-manager/store/transactionTabs.actions';
import * as transactionActions from '../../../transaction-manager/store/transaction.actions';

@Component({
  selector: 'du-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [collapse]
})
export class MenuComponent {
  @Input() menuInfo: any;
  @Input() draggable: boolean = false;

  constructor(private store: Store<fromTransactionTabs.TransactionMgtState>, private _globalService: GlobalService) { }

  private isToggleOn(item) {
    item.toggle === 'on' ? item.toggle = 'off' : item.toggle = 'on';
  }

  private _selectItem(item) {
    this._globalService.dataBusChanged('isActived', item);
  }

  delegateOpenTabDetails(tab: any, event?: Event) {
    this.store.dispatch(new transactionTabsActions.OpenTabAction({
      type: 0,
      tab: {
        id: 1,
        type: "TRANSACTION",
        heading: tab.title,
        active: true,
        closable: true,
        transaction: null
      }
    }));
  }
}