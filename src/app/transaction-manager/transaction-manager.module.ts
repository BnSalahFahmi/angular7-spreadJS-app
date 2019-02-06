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
import { TransactionService } from './services/transaction.service';
import { TransactionEffects } from './store/transaction.effects';
import { TransactionTabsEffects } from './store/transactionTabs.effects';
// import { SpreadSheetsModule } from "../../../lib/gc.spread.sheets.angular.12.0.0";
import { SpreadSheetsModule } from "@grapecity/spread-sheets-angular";
import {TransactionInfoComponent} from "./components/transaction-info/transaction-info.component";
import { ParamNodeComponent } from './components/param-node/param-node.component';
import { SpreadViewComponent } from './containers/spread-view/spread-view-container.component';
import { GraphViewComponent } from './containers/graph-view/graph-view-container.component';
import { GraphComponent } from './components/graph/graph.component';

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
        SpreadSheetsModule,
    ],
    providers: [
        TransactionService,
        GlobalService
    ],
    declarations: [
        TransactionMgtComponent,
        CockpitComponent,
        TransactionInfoComponent,
        IconComponent,
        ParamNodeComponent,
        SpreadViewComponent,
        GraphViewComponent,
        GraphComponent
    ],
    exports: [
        
    ],
})
export class TransactionMgtModule { }
