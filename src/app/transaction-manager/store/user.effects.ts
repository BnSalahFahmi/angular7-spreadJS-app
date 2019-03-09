import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, ActionsSubject } from "@ngrx/store";
import { State } from '../../transaction-manager/store/Structure.reducer';
import { Observable } from "rxjs";
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromUser from './user.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { Structure } from "../../transaction-manager/models/Structure.model";
import { StructureService } from "../../transaction-manager/services/Structure.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from '../../transaction-manager/services/user.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private toasterService: ToastrService
    ) { }


    @Effect()
    initUsers$: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.INIT_USERS),
        switchMap((action) =>
            this.userService.initUsers().pipe(
                map(data => new fromUser.InitUsersSuccessAction(data)),
                catchError(err => {
                    this.toasterService.error(err.message, '');
                    return of(new fromUser.InitUsersFailAction({ error: err.message }))
                }),
            ),
        ),
    );

}