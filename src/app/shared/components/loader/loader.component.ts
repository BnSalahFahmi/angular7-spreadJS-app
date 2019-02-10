import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from '../../services/loading.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoaderState } from '../../store/loader.state';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../../reducers/index';
import { isLoadingSpinnerActive } from '../../../core/store/loader.reducer';

@Component({
  selector: 'screen-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: Observable<any>;

  //private subscription: Subscription;

  constructor(private store: Store<fromApp.State>) {
    this.isLoading = this.store.pipe(
      select((state: fromApp.State) => state.loading.active)
    )

    this.isLoading.subscribe(data => console.log(data));
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }

}
