import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hoveringChange(val){
    console.log();
  }

}
