import { Routes, RouterModule } from '@angular/router';
import { TransactionMgtComponent } from './transaction-manager.component';
import { NgModule } from '@angular/core';
import { IconComponent } from './components/icon/icon.component';
import { GraphViewComponent } from './containers/graph-view/graph-view-container.component';
import { SpreadViewComponent } from './containers/spread-view/spread-view-container.component';

export const routes: Routes = [
    {
        path: '',
        component: TransactionMgtComponent,
        children: [
            {
                path: 'graph-view',
                component: GraphViewComponent
            },
            {
                path: 'spread-view',
                component: SpreadViewComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionMgtRoutingModule {}
