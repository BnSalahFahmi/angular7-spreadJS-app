import { Component, Input } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { NotificationModel } from '../../../shared/models/notification-model';
import { Observable, BehaviorSubject } from 'rxjs';
import * as fromRoot from '../../../reducers';
import { Store, select } from '@ngrx/store';
import * as LayoutActions from '../../store/layout.actions';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  avatarImgSrc: string = 'assets/images/angular_logo.png';
  TransactionName: string = 'Angular 7';
  showSidenav$: Observable<boolean>;
  tip = { ring: true, email: true };

  constructor(private store: Store<fromRoot.State>, private _globalService: GlobalService) {

  }

  public _sidebarToggle() {
    this.store.dispatch(new LayoutActions.ToggleSidenav());
  }

  alertMessage(data: NotificationModel = {
    type: 'default',
    title: 'Look here!',
    value: 'This alert needs your attention.'
  }) {
    this._globalService.dataBusChanged('notification', data);
  }

}
