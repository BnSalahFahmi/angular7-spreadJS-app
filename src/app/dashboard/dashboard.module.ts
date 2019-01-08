import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { FrontDashboardComponent } from './containers/front-dashboard/front-dashboard.component';
import { ContractsPanelComponent } from './components/contracts-panel/contracts-panel.component';
import { PortfoliosPanelComponent } from './components/portfolios-panel/portfolios-panel.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DashboardRoutingModule,
    TabsModule
  ],
  declarations: [ 
    DashboardComponent, FrontDashboardComponent, ContractsPanelComponent, PortfoliosPanelComponent
  ]
})
export class DashboardModule { }
