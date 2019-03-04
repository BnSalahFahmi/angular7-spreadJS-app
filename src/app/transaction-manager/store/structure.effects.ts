import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, ActionsSubject } from "@ngrx/store";
import { State } from './Structure.reducer';
import { Observable } from "rxjs";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromStructure from './Structure.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as StructureActions from './Structure.actions';
import { Structure } from "../models/Structure.model";
import { StructureService } from "../services/Structure.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class StructureEffects {

    constructor(
        private actions$: Actions,
        private structureService: StructureService,
        private router: Router,
        private toasterService: ToastrService
    ) { }


    @Effect()
    loadStructures$: Observable<Action> = this.actions$.pipe(
        ofType(StructureActions.LOAD_STRUCTURE_DATA),
        switchMap((action) =>
            this.structureService.fetchStructures().pipe(
                map(data => new fromStructure.LoadStructureDataSuccessAction(data)),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromStructure.LoadStructureDataFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    addStructure$: Observable<Action> = this.actions$.pipe(
        ofType(StructureActions.ADD_STRUCTURE),
        switchMap((structure) =>
            this.structureService.addStructure(structure).pipe(
                map(data => {
                    this.toasterService.success('Structure Added Successfully');
                    return new fromStructure.AddStructureSuccessAction(data)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromStructure.AddStructureFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    updateStructure$: Observable<Action> = this.actions$.pipe(
        ofType(StructureActions.UPDATE_STRUCTURE),
        switchMap((structure) =>
            this.structureService.updateStructure(structure).pipe(
                map(data => {
                    this.toasterService.success('Structure Updated Successfully');
                    return new fromStructure.UpdateStructureSuccessAction(data)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromStructure.UpdateStructureFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    getStructure$: Observable<Action> = this.actions$.pipe(
        ofType(StructureActions.GET_STRUCTURE),
        switchMap((structure) =>
            this.structureService.getStructure(structure).pipe(
                map(data => {
                    return new fromStructure.GetStructureSuccessAction(data)
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromStructure.GetStructureFailAction({ error: err.message }))
                }),
            ),
        ),
    );

    @Effect()
    deleteStructure$: Observable<Action> = this.actions$.pipe(
        ofType(StructureActions.DELETE_STRUCTURE),
        switchMap((structure) =>
            this.structureService.deleteStructure(structure).pipe(
                map(data => {
                    this.toasterService.success('Structure Deleted Successfully');
                    return new fromStructure.DeleteStructureSuccessAction(structure);
                }),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromStructure.DeleteStructureFailAction({ error: err.message }))
                }),
            ),
        ),
    );

}