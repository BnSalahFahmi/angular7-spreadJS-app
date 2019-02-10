import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../store/loader.state';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}