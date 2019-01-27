import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { routes } from './app.routing';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgxBootstrapModule } from './shared/ui/ngxbootstrap.module';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpReqInterceptor } from './shared/utilities/http.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './core/containers';
import { HttpModule } from '@angular/http';
import { TransactionService } from './transaction-manager/services/Transaction.service';
//import { TransactionMgtComponent } from './Transaction-manager/transaction-manager.component';


const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes, {
       useHash: true,
       initialNavigation: 'enabled',
       paramsInheritanceStrategy: 'always'
    }),
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production,
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  providers: [
    TabsetConfig,
    NgxSpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpReqInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
