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
import { LoginComponent } from './components/login/login.component';
import { GlobalService } from './../shared/services/global.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { FooterComponent } from './components/footer/footer.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { TreeModule } from 'angular-tree-component';
import { StructuresTreeViewComponent } from './components/structures-tree-view/structures-tree-view.component';
import { TransactionsTreeViewComponent } from './components/transactions-tree-view/transactions-tree-view.component';
import { TreeService } from './services/tree.service';

export const Guards = [
    
]

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        SharedModule,
        TreeModule.forRoot()
    ],
    providers: [
        TreeService
    ],
    declarations: [
        LoginComponent,
        MenuComponent,
        SidebarComponent,
        NavbarComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        FooterComponent,
        FileTreeComponent,
        TreeViewComponent,
        TransactionsTreeViewComponent,
        StructuresTreeViewComponent
    ],
    exports: [
        LoginComponent,
        SidebarComponent,
        NavbarComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        FooterComponent,
        FileTreeComponent,
        TreeViewComponent,
        TransactionsTreeViewComponent,
        StructuresTreeViewComponent
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
