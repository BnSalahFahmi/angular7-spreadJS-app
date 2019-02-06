import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FullLayoutComponent } from './core/containers';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   component: AccessDeniedComponent,
  //   canActivate: [AccessGuardService]
  // },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'transactions',
        loadChildren: './transaction-manager/transaction-manager.module#TransactionMgtModule',
        canActivate: []
      },
      {
        path:'',
        redirectTo: 'transactions',
        pathMatch: 'full'
      }
    ]
  },
  { path: '',  redirectTo:'', pathMatch:'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
