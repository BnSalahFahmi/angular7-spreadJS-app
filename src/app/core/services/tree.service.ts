import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ITEM } from '../../core/menu';
import { GlobalService } from '../../shared/services/global.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TreeService {

  filterSubject: BehaviorSubject<any> = new BehaviorSubject(null) ;

  constructor(public _globalService: GlobalService) {
     
  }

  doFilter(query: any){
      this.filterSubject.next(query);
  }

}
