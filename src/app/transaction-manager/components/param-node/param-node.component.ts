import { Component, OnInit } from '@angular/core';
import { ParamNode } from '../../models/param-node.model';
import {  mockParamNode } from '../../models/param-node.model';

@Component({
  selector: 'param-node',
  templateUrl: './param-node.component.html',
  styleUrls: ['./param-node.component.scss']
})
export class ParamNodeComponent implements OnInit {

  paramNode: ParamNode;

  constructor() { }

  ngOnInit() {
    this.paramNode = mockParamNode();
  }

  drag(ev) {
    ev.dataTransfer.setData("node", JSON.stringify(this.paramNode));
  }

}
