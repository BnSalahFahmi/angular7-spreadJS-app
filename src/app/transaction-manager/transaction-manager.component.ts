import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as transactionTabsActions from './store/transactionTabs.actions';
import { selectTransactionTabs } from './store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromTransactionTabs from './store/index';
import { GlobalService } from '../shared/services/global.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'transaction-manager',
  templateUrl: './transaction-manager.component.html',
  styleUrls: ['./transaction-manager.component.scss'],
  providers: []
})
export class TransactionMgtComponent implements OnInit {
  showloading: boolean = false;
  tabs$: Observable<any>;
  listTabs:any = [];

  constructor(private toastr: ToastrService, private store:Store<any>, private globalService: GlobalService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    
    this.tabs$ = this.store.pipe(select(fromTransactionTabs.selectTransactionTabs));
    /* this.tabs$.subscribe((resp)=> {
      this.listTabs = resp;
      if (resp.length == 0) {
         this.store.dispatch(new transactionTabsActions.OpenTabAction({
           type: 0,
           tab: {
              id:-1, 
              type: 'HOME',
              name: 'Summary',
              closable: false 
          }
         }));
      }
    }, (err)=> {
      console.log(err);
    }); */
  }

  ngOnInit() {
    this.listTabs = [];
  }

  isActiveTab(tab: any) {
    //return tab.id === this.tabDetail.tabState.id
  }

  delegateOpenTab(tab: any, event?: Event) {
     this.store.dispatch(new transactionTabsActions.OpenTabAction({
      type: 0,
      tab: {
        id: this.listTabs.length,
        type: "NEW TRANCSACTION",
        heading: 'New Transaction',
        active:true,
        closable: true
      }
    }));
  }
  delegateRemoveTab(tab: any, event?:Event) {
    this.store.dispatch(new transactionTabsActions.CloseTabAction(tab));
  }

  removeTabHandler(tab){
    console.log();
  }

  onSelectTab(tab){
    //tab.active = true
    //this.globalService.refreshSpreadSheetEvent.next(true);
  }

  onDeSelectTab(tab){
    //tab.active = false;
    console.log();
  }

  onBeforeRemoveTab(event){
    console.log();
  }

  open(){
    debugger;
    this.toastr.error('Hello world!', 'Toastr fun!', {timeOut: 3000, closeButton: true, progressBar: true});
  }
}
