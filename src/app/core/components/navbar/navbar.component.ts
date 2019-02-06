import { Component, Input } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { NotificationModel } from '../../../shared/models/notification-model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  avatarImgSrc: string = 'assets/images/angular_logo.png';
  TransactionName: string = 'Angular 7';

  sidebarToggle: boolean = true;
  tip = { ring: true, email: true };

  constructor(private _globalService: GlobalService) { }

  public _sidebarToggle() {

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);
  }

  alertMessage(data: NotificationModel = {
    type: 'default',
    title: 'Look here!',
    value: 'This alert needs your attention.'
  }) {
    //this._globalService._notification(data);
    this._globalService.dataBusChanged('notification', data);
  }

}
