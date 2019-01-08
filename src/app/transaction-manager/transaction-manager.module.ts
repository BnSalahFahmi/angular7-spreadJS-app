import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* components */
import { SharedModule } from './../shared/shared.module';
import { CockpitComponent } from './components//cockpit/cockpit.component';
import { LoadingComponent } from './../shared/components/loading/loading.component';
import { NotificationComponent } from './../shared/components/notification/notification.component';
import { GlobalService } from './../shared/services/global.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { TransactionMgtRoutingModule } from './transaction-manager.routing';
import { TransactionMgtComponent } from './transaction-manager.component';
import { NgxBootstrapModule } from '../shared/ui/ngxbootstrap.module';
import { TabsModule } from 'ngx-bootstrap';
import { IconComponent } from './components/icon/icon.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/index' ;
import { routes } from './transaction-manager.routing';
import { TransactionEffects } from './store/transaction.effects';
import { TransactionTabsEffects } from './store/transactionTabs.effects';
import { SpreadSheetsModule } from "../../../lib/gc.spread.sheets.angular.12.0.0";
import { TransactionService } from './services/transaction.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('TransactionFeature', reducers),
        EffectsModule.forFeature([TransactionEffects, TransactionTabsEffects]),
        TabsModule,
        SpreadSheetsModule
    ],
    providers: [
        GlobalService,
        TransactionService
    ],
    declarations: [
        TransactionMgtComponent,
        CockpitComponent,
        IconComponent
    ],
    exports: [
        
    ],
})
export class TransactionMgtModule { }
