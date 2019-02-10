import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<screen-loader></screen-loader><router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
