import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'right-config',
  templateUrl: './right-config.component.html',
  styleUrls: ['./right-config.component.scss']
})
export class RightConfigComponent implements OnInit {

  isConfigToggle: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(private _globalService: GlobalService, private _translate: TranslateService) { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'English' },
      { item_id: 2, item_text: 'French' }
    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'English' },
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    if(item.item_id == 1)
      this.useLang('en');
    else if(item.item_id == 2)
      this.useLang('fr');
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  configToggle() {
    this.isConfigToggle = !this.isConfigToggle;
    this._globalService.dataBusChanged('sidebarToggle', !this.isConfigToggle);
  }

  useLang(lang: string){
    this._translate.use(lang);
  }
}
