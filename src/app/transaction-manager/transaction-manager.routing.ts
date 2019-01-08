import { Routes, RouterModule } from '@angular/router';
import { TransactionMgtComponent } from './transaction-manager.component';
import { NgModule } from '@angular/core';
import { IconComponent } from './components/icon/icon.component';

export const routes: Routes = [
    {
        path: '',
        component: TransactionMgtComponent,
    },
    {
        path: 'icon',
        component: IconComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionMgtRoutingModule {}
