import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* components */
import { SharedModule } from './../shared/shared.module';
import { LoadingComponent } from './../shared/components/loading/loading.component';
import { RightConfigComponent } from './layouts/right-config/right-config.component';
import { NotificationComponent } from './../shared/components/notification/notification.component';
import { ContentTopComponent } from './layouts/content-top/content-top.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { GlobalService } from './../shared/services/global.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionInfoComponent } from './layouts/transaction-info/transaction-info.component';

export const Guards = [
    
]

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        SharedModule
    ],
    providers: [
        GlobalService
    ],
    declarations: [
        MenuComponent,
        SidebarComponent,
        NavbarComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        TransactionInfoComponent
    ],
    exports: [
        SidebarComponent,
        NavbarComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        LoadingComponent,
        TransactionInfoComponent
    ]
})
export class CoreModule {
    static forRoot() {
        return {
          ngModule: CoreModule,
          providers: Guards,
        };
      }
 }
