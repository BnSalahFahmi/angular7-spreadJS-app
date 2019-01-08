import { Subject } from "rxjs";

export class LoadingService {
    
  private componentLoadingSubject: Subject<Object>;
  private httpLoadingSubject: Subject<Object>;

  constructor() {
    this.componentLoadingSubject = new Subject<Object>();
    this.httpLoadingSubject = new Subject<Object>();
  }

  pushComponentLoadingNotification(loading: boolean) {
    this.componentLoadingSubject.next(loading);
  }

  pushHttpLoadingNotification(loading: boolean) {
    this.httpLoadingSubject.next(loading);
    this.componentLoadingSubject.next(loading);
  }

  getComponentLoadingObservable() {
    return this.componentLoadingSubject.asObservable();
  }

  getHttpLoadingObservable() {
    return this.httpLoadingSubject.asObservable();
  }
}