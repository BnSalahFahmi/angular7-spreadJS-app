import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { menuService } from '../../../shared/services/menu.service';
import * as fromRoot from '../../../reducers';
import { Store, select } from '@ngrx/store';
import { mockTransaction } from '../../../transaction-manager/models/transaction.model';
import * as transactionTabsActions from '../../../transaction-manager/store/transactionTabs.actions';
import * as userActions from '../../../transaction-manager/store/user.actions';
import { TreeService } from '../../services/tree.service';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [menuService]
})
export class SidebarComponent implements OnInit {

    public sidebarToggle: boolean;
    
    constructor(private store: Store<fromRoot.State>, public _globalService: GlobalService, private _treeService: TreeService) {
        this.store.pipe(select(fromRoot.getShowSidenav)).subscribe(
            val => {
                this.sidebarToggle = val;
            });
    }

    ngOnInit() {
        this.store.dispatch(new userActions.InitUsersAction());
    }

    public _sidebarToggle() {
        this._globalService.data$.subscribe(data => {
            if (data.ev === 'sidebarToggle') {
                this.sidebarToggle = data.value;
            }
        }, error => {
            console.log('Error: ' + error);
        });
    }

    delegateOpenTabDetails(tab: any, event?: Event) {
        let transaction = mockTransaction();
        this.store.dispatch(new transactionTabsActions.OpenTabAction({
          type: 0,
          tab: {
            id: this.uuid(),
            type: "TRANSACTION",
            heading: tab.data.name,
            active: true,
            closable: true,
            transaction: transaction
          }
        }));
      }

      uuid() {
        return Math.floor(Math.random() * 10000000000000);
      }

      filterNodes(query) {
          this._treeService.doFilter(query);
      }
}
