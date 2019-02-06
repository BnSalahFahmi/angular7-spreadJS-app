import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { jsPlumbInstance } from "jsplumb";


@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  jsPlumbInstance;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
  }

  // @ViewChild(FlowchartComponent) flowchart:FlowchartComponent;
  // @ViewChild(DatasetComponent) dataset:DatasetComponent;

  toolkitId:string;
  //toolkit:jsPlumbToolkit;

  // constructor(private $jsplumb:jsPlumbService, private elementRef:ElementRef) {
  //   this.toolkitId = this.elementRef.nativeElement.getAttribute("toolkitId");
  // }

  // ngOnInit() {
  //   this.toolkit = this.$jsplumb.getToolkit(this.toolkitId, this.toolkitParams)
  // }

  // load(){
  //   this.toolkit.load({
  //     "groups":[
  //         {"id":"one", "title":"Group 1", "left":100, top:50 },
  //         {"id":"two", "title":"Group 2", "left":450, top:250, type:"constrained"  }
  //     ],
  //     "nodes": [
  //         { "id": "window1", "name": "1", "left": 10, "top": 20, group:"one" },
  //         { "id": "window2", "name": "2", "left": 140, "top": 50, group:"one" },
  //         { "id": "window3", "name": "3", "left": 450, "top": 50 },
  //         { "id": "window4", "name": "4", "left": 110, "top": 370 },
  //         { "id": "window5", "name": "5", "left": 140, "top": 150, group:"one" },
  //         { "id": "window6", "name": "6", "left": 50, "top": 50, group:"two" },
  //         { "id": "window7", "name": "7", "left": 50, "top": 450 }
  //     ],
  //     "edges": [
  //         { "source": "window1", "target": "window3" },
  //         { "source": "window1", "target": "window4" },
  //         { "source": "window3", "target": "window5" },
  //         { "source": "window5", "target": "window2" },
  //         { "source": "window4", "target": "window6" },
  //         { "source": "window6", "target": "window2" }
  //     ]
  // })
  // }

}
