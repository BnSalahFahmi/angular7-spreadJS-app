import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export interface Language {
  id: number,
  name: string,
  flag: string
}

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
  languages: Language[] = [{
    id: 1,
    name: 'English',
    flag: 'http://flags.fmcdn.net/data/flags/h80/us.png'
  },
  {
    id: 2,
    name: 'French',
    flag: 'http://flags.fmcdn.net/data/flags/h80/fr.png'
  },
  {
    id: 3,
    name: 'Deutsch',
    flag: 'http://flags.fmcdn.net/data/flags/h80/de.png'
  }];
  selectedLanguage = 'English';
  constructor(private _globalService: GlobalService, private _translate: TranslateService, private _toastrService: ToastrService) { }

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
    if (item.item_id == 1)
      this.useLang('en');
    else if (item.item_id == 2)
      this.useLang('fr');
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  configToggle() {
    this.isConfigToggle = !this.isConfigToggle;
    this._globalService.dataBusChanged('sidebarToggle', !this.isConfigToggle);
  }

  onLangChange() {
    switch (this.selectedLanguage) {
      case 'English':
        this.useLang('en');
        break;
      case 'French':
        this.useLang('fr');
        break;
      case 'Deutsch':
        this.useLang('en');
        break;
    }
  }

  useLang(lang: string) {
    this._translate.use(lang);
    this._toastrService.success('Language has been changed', 'Success');
  }
}
