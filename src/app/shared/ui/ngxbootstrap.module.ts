import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {
    AccordionModule, 
    AlertModule,
    ButtonsModule, 
    CarouselModule, 
    CollapseModule,
    BsDropdownModule, 
    ModalModule,
    PaginationModule,
    PopoverModule,
    ProgressbarModule,
    RatingModule,
    SortableModule,
    //TabsModule,
    TimepickerModule,
    TooltipModule,
    TypeaheadModule

  } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
      imports: [
        AccordionModule, 
        AlertModule,
        ButtonsModule, 
        CarouselModule, 
        CollapseModule,
        BsDropdownModule, 
        ModalModule,
        PaginationModule,
        PopoverModule,
        ProgressbarModule,
        RatingModule,
        SortableModule,
        //TabsModule,
        TimepickerModule,
        TooltipModule,
        TypeaheadModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
      exports:[
        AccordionModule, 
        AlertModule,
        ButtonsModule, 
        CarouselModule, 
        CollapseModule,
        BsDropdownModule, 
        ModalModule,
        PaginationModule,
        PopoverModule,
        ProgressbarModule,
        RatingModule,
        SortableModule,
        //TabsModule,
        TimepickerModule,
        TooltipModule,
        TypeaheadModule,
        CommonModule
      ],
      providers: []
})
export class NgxBootstrapModule{

}