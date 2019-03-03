import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/* components */
import { CardComponent } from './components/card/card.component';
import { TodolistComponent } from './components/todolist/todolist.component';
// import { TabsetComponent } from './components/tabset/tabset.component';
import { TabContentComponent } from './components/tabset/tab-content/tab-content.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TabManagerComponent } from './components/tab-manager/tab-manager.component';
import { RouterModule } from '@angular/router';
import { NgxBootstrapModule } from '../shared/ui/ngxbootstrap.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingScreenService } from './services/loading.service';
import { GlobalService } from './services/global.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationService } from './services/pagination.service';
import { TableSortableHeader } from './directives/tableSortableHeader.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    MomentModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([])
  ],
  declarations: [
    TableSortableHeader,
    CardComponent,
    TodolistComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    ProfileComponent,
    LoaderComponent,
    TabManagerComponent,
    NotFoundComponent,
    PaginationComponent,
    SnackBarComponent
  ],
  exports: [
    // Modules
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    TableSortableHeader,
    NgSelectModule,
    MomentModule,
    HttpClientModule,
    CardComponent,
    TodolistComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    ProfileComponent,
    LoaderComponent,
    TabManagerComponent,
    NotFoundComponent,
    PaginationComponent,
    SnackBarComponent
  ],
  providers: [
    GlobalService,
    PaginationService,
    LoadingScreenService
  ]
})
export class SharedModule { }
