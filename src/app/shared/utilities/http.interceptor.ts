import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { map, filter, scan, tap } from 'rxjs/operators';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {

  constructor(private _loadingService: LoadingService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ;
    this._loadingService.pushHttpLoadingNotification(true);
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this._loadingService.pushHttpLoadingNotification(false);
          }
        }, error => {
          this._loadingService.pushHttpLoadingNotification(false);

        })
      )

  };

}