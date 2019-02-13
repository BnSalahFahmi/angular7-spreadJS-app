import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as transactionTabsActions from './store/transactionTabs.actions';
import * as transactionActions from './store/transaction.actions';
import { selectTransactionTabs } from './store';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import * as fromTransactionTabs from './store/index';
import { GlobalService } from '../shared/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { transition, trigger, query, style, animate, group, animateChild } from '@angular/animations';
import { contextTransitions } from '../shared/animation/router-animate';
import { mockTransaction, Transaction } from './models/transaction.model';
import { collapse } from '../shared/animation/collapse-animate';

@Component({
  selector: 'transaction-manager',
  templateUrl: './transaction-manager.component.html',
  styleUrls: ['./transaction-manager.component.scss'],
})
export class TransactionMgtComponent implements OnInit {
  showloading: boolean = false;
  tabs$: Observable<any>;
  listTabs: any = [];
  displayedView: string = "graph-view";
  transaction: Transaction = mockTransaction();

  constructor(private store: Store<any>, private globalService: GlobalService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private cd: ChangeDetectorRef) {
    this.store.dispatch(new transactionActions.LoadDataAction());
    this.tabs$ = this.store.pipe(select(fromTransactionTabs.selectTransactionTabs));
    // this.tabs$.subscribe((resp)=> {
    //   if(resp)
    //     this.listTabs = resp;
    //   if (resp && resp.length == 0) {
    //      this.store.dispatch(new transactionTabsActions.OpenTabAction({
    //        type: 0,
    //        tab: {
    //           id:-1, 
    //           type: 'HOME',
    //           name: 'Summary',
    //           closable: false 
    //       }
    //      }));
    //   }
    // }, (err)=> {
    //   console.log(err);
    // }); 
  }

  get currentTransaction() {
    return this.transaction;
  }

  ngOnInit() {
    this.listTabs = [];
  }

  get viewDisplayed() {
    return this.displayedView;
  }

  setDisplayedView(view) {
    this.displayedView = view;
  }

  isActiveTab(tab: any) {
    //return tab.id === this.tabDetail.tabState.id
  }

  newTransaction() {
    var newTransaction = mockTransaction();
    newTransaction.creator = new Object('Fahmi BEN SALAH');
    newTransaction.creationDate = new Date();
    return newTransaction;
  }

  delegateOpenTab(tab: any, event?: Event) {
    this.store.dispatch(new transactionTabsActions.OpenTabAction({
      type: 0,
      tab: {
        id: this.listTabs.length,
        type: "NEW TRANSACTION",
        heading: 'New Transaction',
        active: true,
        closable: true,
        transaction: this.newTransaction()
      }
    }));
  }

  delegateRemoveTab(tab: any, event?: Event) {
    this.store.dispatch(new transactionTabsActions.CloseTabAction({ tabId: tab.id }));
  }

  removeTabHandler(tab) {
    console.log();
  }

  onSelectTab(tab) {
    // if (!tab.active)
    //   this.store.dispatch(new transactionTabsActions.SetActiveTab({ tabId: tab.id }));
  }

  onDeSelectTab(tab) {
    //TODO
  }

  onBeforeRemoveTab(event) {
    console.log();
  }

  open() {
    this.toastr.error('Hello world!', 'Toastr fun!', { timeOut: 3000, closeButton: true, progressBar: true });
  }

  getContext(routerOutlet: RouterOutlet): string {
    return routerOutlet.activatedRouteData['context'];
  }
}
