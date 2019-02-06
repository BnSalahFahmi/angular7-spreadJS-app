// import { Injectable } from "@angular/core";
// import { CanActivate } from "@angular/router";
// import { Store, select } from "@ngrx/store";
// import * as fromRoot from '../../reducers';
// import { Observable } from "rxjs";

// @Injectable()
// export class AdminGuardService implements CanActivate {

//   loggedIn$: Observable<boolean>;
//   profile$: Observable<User>;

//   //data
//   profile: User;
//   loggedIn: boolean;
//   constructor(private store: Store<fromRoot.State>) {
//     this.loggedIn$ = store.pipe(select(fromRoot.isLogged));
//     this.profile$ = store.pipe(select(fromRoot.getProfile));
//     this.loggedIn$.subscribe((res:boolean) => {this.loggedIn = res});
//     this.profile$.subscribe((res:User) => {this.profile = res});
//   }

//   canActivate() {
//     if (this.profile) {
//       switch (this.profile.role) {
//         case 'ADMIN': {
//           return true;
//         }

//         default:
//           return false;
//       }
//     } else {
//       return false;
//     }
//   }
// }

