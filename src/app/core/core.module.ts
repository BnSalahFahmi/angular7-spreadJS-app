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
        RightConfigComponent
    ],
    exports: [
        SidebarComponent,
        NavbarComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        LoadingComponent
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
