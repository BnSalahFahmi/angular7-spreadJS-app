import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FullLayoutComponent } from './core/containers';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'index',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule',
      //   canActivate: []
      // },
      {
        path: 'index',
        loadChildren: './transaction-manager/transaction-manager.module#TransactionMgtModule',
        canActivate: []
      },
      {
        path:'',
        redirectTo: 'index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
