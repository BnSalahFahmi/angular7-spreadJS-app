import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private toastrServcice: ToastrService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    // if (!environment.production) {
    //   displayMessage += ' See console for details.';
    // }

    this.toastrServcice.error(displayMessage);

    super.handleError(error);
  }
}