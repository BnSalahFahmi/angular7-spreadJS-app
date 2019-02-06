import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/* components */
import { CardComponent } from './components/card/card.component';
import { TodolistComponent } from './components/todolist/todolist.component';
// import { TabsetComponent } from './components/tabset/tabset.component';
import { TabContentComponent } from './components/tabset/tab-content/tab-content.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { SwitchComponent } from './components/switch/switch.component';
import { AlertComponent } from './components/alert/alert.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TabManagerComponent } from './components/tab-manager/tab-manager.component';
import { RouterModule } from '@angular/router';
import { NgxBootstrapModule } from '../shared/ui/ngxbootstrap.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([])
  ],
  declarations: [
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    WeatherComponent,
    ProfileComponent,
    LoaderComponent,
    LoadingComponent,
    TabManagerComponent,
    NotFoundComponent  
  ],
  exports: [
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    AlertComponent,
    WeatherComponent,
    ProfileComponent,
    LoaderComponent,
    LoadingComponent,
    TabManagerComponent,
    NotFoundComponent,
    RouterModule,
    TranslateModule,
    NgbModule,
    NgMultiSelectDropDownModule
  ],
  providers: [
    
  ]
})
export class SharedModule { }
