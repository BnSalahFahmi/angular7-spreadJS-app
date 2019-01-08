import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  httpLoading: boolean;

  constructor(private loadingService: LoadingService) {
    loadingService.getHttpLoadingObservable().subscribe((loading: boolean) => {
      if(loading!=null){
        this.httpLoading = loading
      }
    })
   }

  ngOnInit() {
  }

}
