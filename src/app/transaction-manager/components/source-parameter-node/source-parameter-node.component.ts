import { Component, OnInit } from '@angular/core';
import { SourceParamaterNode, mockSourceParamaterNode } from '../../models/source-parameter-node.model';

@Component({
  selector: 'param-node',
  templateUrl: './source-parameter-node.component.html',
  styleUrls: ['./source-parameter-node.component.scss']
})
export class SourceParameterNodeComponent implements OnInit {

  sourceParameterNode: SourceParamaterNode;

  constructor() { }

  ngOnInit() {
    this.sourceParameterNode = mockSourceParamaterNode();
  }

  drag(ev) {
    ev.dataTransfer.setData("node", JSON.stringify(this.sourceParameterNode));
  }

}
