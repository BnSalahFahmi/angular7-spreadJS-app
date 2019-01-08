import { Component, Input } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { collapse } from '../../../shared/animation/collapse-animate';

@Component({
  selector: 'du-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [collapse]
})
export class MenuComponent {
  @Input() menuInfo: any;

  constructor(private _globalService: GlobalService) { }

  private isToggleOn(item) {
    item.toggle === 'on' ? item.toggle = 'off' : item.toggle = 'on';
  }

  private _selectItem(item) {
    //this._globalService._isActived(item);
    this._globalService.dataBusChanged('isActived', item);
  }
}