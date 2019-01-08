import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './editor.routing';
import { EditorComponent } from './editor.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        EditorComponent
    ]
})
export class EditorModule { }
