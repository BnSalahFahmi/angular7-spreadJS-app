import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { menuService } from '../../../shared/services/menu.service';
import { Observable, BehaviorSubject } from 'rxjs';
import * as fromRoot from '../../../reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [menuService]
})
export class SidebarComponent implements OnInit {

  public menuInfo: Array<any> = [];
  public sidebarToggle;
  fileData: Array<any>;


  constructor(private store: Store<fromRoot.State>, private _menuService: menuService,
    public _globalService: GlobalService) {
    this.store.pipe(select(fromRoot.getShowSidenav)).subscribe(
      val => {
        this.sidebarToggle = val;
      });
  }

  ngOnInit() {
    this.menuInfo = this._menuService.putSidebarJson();
    this._menuService.selectItem(this.menuInfo); 
    this._isSelectItem(this.menuInfo);
    this.fileData =[
      {
          name: 'Folder1',
          isSelect: true,
          children: [
              {
                  name: 'Item1',
                  isSelect: true,
                  children: [
                      {
                          name: 'Child1',
                      },
                      {
                          name: 'Child2',
                      }
                  ]
              },
              {
                  name: 'Item2',
              }
          ]
      }, {
          name: 'Folder2',
          isSelect: true,
          children: [
              {
                  name: 'Item1',
              },
              {
                  name: 'Item2',
              }
          ]
      }, {
          name: 'Folder3',
          children: [
              {
                  name: 'Item1',
              },
              {
                  name: 'Item2',
              }
          ]
      }
  ];
  }

  public _sidebarToggle() {
    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });

  }

  _isSelectItem(item) {
    for (const i in item) {
      if (item[i].children) {
        for (const index in item[i].children) {
          if (item[i].children[index].isActive || item[i].children[index].toggle === 'on') {
            item[i].toggle = 'on';
            break;
          } else {
            this._isSelectItem(item[i].children);
          }
        }
      }
    }
  }

}
