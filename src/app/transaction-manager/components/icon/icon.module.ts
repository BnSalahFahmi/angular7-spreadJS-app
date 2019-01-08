import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './icon.routing';
import { IconComponent } from './icon.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    declarations: [
        IconComponent
    ]
})
export class IconModule { }
