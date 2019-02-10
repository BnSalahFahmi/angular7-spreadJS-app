import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* components */
import { SharedModule } from './../shared/shared.module';
import { RightConfigComponent } from './components/right-config/right-config.component';
import { NotificationComponent } from './../shared/components/notification/notification.component';
import { ContentTopComponent } from './components/content-top/content-top.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
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
        RightConfigComponent
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
