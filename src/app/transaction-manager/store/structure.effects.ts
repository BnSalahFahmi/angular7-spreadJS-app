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
        private StructureService: StructureService,
        private router: Router,
        private toasterService: ToastrService
    ) { }


    @Effect()
    loadStructures$: Observable<Action> = this.actions$.pipe(
        ofType(StructureActions.LOAD_STRUCTURE_DATA),
            switchMap((action) =>
            this.StructureService.fetchStructures().pipe(
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
    map((action: any) => action.payload),
    switchMap((Structure) => this.StructureService.addStructure(Structure)),
    map(Structure => {
        this.toasterService.success('Structure Added Successfully');
        return new fromStructure.AddStructureSuccessAction(Structure);
    }),
    catchError(err => {
      this.toasterService.error(err.message);
      return of(new fromStructure.AddStructureFailAction({error: err}));
    })
  );

  @Effect()
  getStructure$: Observable<Action> = this.actions$.pipe(
    ofType(StructureActions.GET_STRUCTURE),
    map((action: any) => action.payload),
    switchMap((StructureId) => this.StructureService.getStructure(StructureId)),
    map(Structure => {
        return new fromStructure.GetStructureSuccessAction(Structure);
    }),
    catchError(err => {
      this.toasterService.error(err.message);
      return of(new fromStructure.GetStructureFailAction({error: err}));
    })
  );

  @Effect()
  deleteStructure$: Observable<Action> = this.actions$.pipe(
    ofType(StructureActions.DELETE_STRUCTURE),
    map((action: any) => action.payload),
    switchMap((StructureId) => this.StructureService.deleteStructure(StructureId)),
    map(Structure => {
        this.toasterService.success('Structure Deleted Successfully');
        return new fromStructure.DeleteStructureSuccessAction(Structure);
    }),
    catchError(err => {
      this.toasterService.error(err.message);
      return of(new fromStructure.DeleteStructureFailAction({error: err}));
    })
  );

}