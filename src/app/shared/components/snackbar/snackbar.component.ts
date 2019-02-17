import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackBarComponent implements OnInit {

  private message = "azazaza";

  constructor(private snackBarService: SnackBarService) {
    
  }

  ngOnInit() {
    this.snackBarService.data$.subscribe(
      (notif) => {
        debugger;
        if (notif != null) {
          this.message = notif.value;
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () { x.className = x.className.replace("show", ""); this.message = null }, 3000);
        }
      }
    )
  }

}
