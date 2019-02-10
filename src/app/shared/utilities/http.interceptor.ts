import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingScreenService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingScreenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
    }));
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    debugger;
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}