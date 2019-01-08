import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
  providers:[
  ]
})
export class FullLayoutComponent implements OnInit{
  private now = new Date().toLocaleTimeString();
  loggedUser = "Fahmi BEN SALAH"

  constructor() {
    // this.loadingService.getHttpLoadingObservable().subscribe(
    //   (data)=> {
    //     if(data != null){
    //       if(data === true)
    //             this.spinner.show();        
    //       else
    //             this.spinner.hide();
    //       }
    //   }
    // )
  }

  ngOnInit(){
    
  }


}
