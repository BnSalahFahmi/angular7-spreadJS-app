import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { NotificationModel } from '../../../shared/models/notification-model';
import { Observable, BehaviorSubject } from 'rxjs';
import * as fromRoot from '../../../reducers';
import { Store, select } from '@ngrx/store';
import * as LayoutActions from '../../store/layout.actions';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  avatarImgSrc: string = 'assets/images/angular_logo.png';
  AppName: string = 'Angular 7';
  sideNavVisible: boolean = true;
  numberFormats : any[];
  dateFormats : any[];
  numberRowsDisplayed: any[];
  timeZones : any[];
  selectedNumberFormat = '1';
  selectedDateFormat = '1';
  selectedNumberRowsDisplayed = '10';
  selectedTimeZone = '(UTC+01:00) Europe/Paris';
  

  constructor(private store: Store<fromRoot.State>, private _globalService: GlobalService, private _translate: TranslateService,
    private _toastrService: ToastrService, private modalService: NgbModal) {
    this.store.pipe(select(fromRoot.getShowSidenav)).subscribe(
      val => {
        this.sideNavVisible = val;
      });
  }

  ngOnInit(){
    let momentTimeZones = moment.tz.names();
    this.timeZones = [];
    momentTimeZones.forEach(timeZone => {
      this.timeZones.push({ label: "(UTC" + moment.tz(timeZone).format('Z') + ") " + timeZone, value: "(UTC" + moment.tz(timeZone).format('Z') + ") " + timeZone});
    })
    this.numberFormats = [
      {label: "# ##0.00", value:'1' },
      {label: "# ##0,00", value:'2' },
      {label: "#,##0.00", value:'3' },
      {label: "#.##0,00", value:'4'}
    ];
    this.dateFormats = [
      {label: "dd/m/yy", value:'1' },
      {label: "dd/mm/yy", value:'2' },
      {label: "dd/mm/yyyy", value:'3' },
      {label: "m/dd/yyyy", value:'4' },
      {label: "mm/dd/yyyy", value:'5' },
    ];
    this.numberRowsDisplayed = [
      {label: "10", value:'10' },
      {label: "20", value:'20' },
      {label: "50", value:'50' }
    ];
  }

  public _sidebarToggle() {
    if (this.sideNavVisible) {
      this.store.dispatch(new LayoutActions.CloseSidenavAction());
    } else {
      this.store.dispatch(new LayoutActions.OpenSidenavAction());
    }
  }

  alertMessage(data: NotificationModel = {
    type: 'default',
    title: 'Look here!',
    value: 'This alert needs your attention.'
  }) {
    this._globalService.dataBusChanged('notification', data);
  }

  useLang(lang: string) {
    this._translate.use(lang);
    this._toastrService.info('Language has been changed', 'Success');
  }

  openUserPrefModal(content) {
    this.modalService.open(content, {size: 'lg', windowClass: 'modal-holder pref-modal', centered: true});
  }

  logOut(){
    
  }
}
