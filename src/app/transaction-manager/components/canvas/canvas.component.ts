import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as go from 'gojs';

import { GuidedDraggingTool } from 'gojs/extensionsTS/GuidedDraggingTool';

@Component({
  selector: 'graph-editor',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  private diagram: go.Diagram = new go.Diagram();
  private palette: go.Palette = new go.Palette();

  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;

  @ViewChild('paletteDiv')
  private paletteRef: ElementRef;

  @ViewChild('mySavedModel')
  private savedModel: ElementRef;

  @Input()
  get model(): go.Model { return this.diagram.model; }
  set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<go.Node | null>();

  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  constructor() {
    const $ = go.GraphObject.make;
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = true;
    this.diagram.allowGroup = true;
    this.diagram.allowCopy = true;
    this.diagram.undoManager.isEnabled = true;
    this.diagram.toolManager.draggingTool = new GuidedDraggingTool();
    this.diagram.addDiagramListener("ChangedSelection",
      e => {
        const node = e.diagram.selection.first();
        this.nodeSelected.emit(node instanceof go.Node ? node : null);
      });
    this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

    function highlightGroup(e, grp, show) {
      if (!grp) return;
      e.handled = true;
      if (show) {
        var tool = grp.diagram.toolManager.draggingTool;
        var map = tool.draggedParts || tool.copiedParts;
        if (grp.canAddMembers(map.toKeySet())) {
          grp.isHighlighted = true;
          return;
        }
      }
      grp.isHighlighted = false;
    }

    function expandGroups(g, i, level) {
      if (!(g instanceof go.Group)) return;
      g.isSubGraphExpanded = i < level;
      g.memberParts.each(function (m) {
        expandGroups(m, i + 1, level);
      })
    }
    function reexpand(e) {
      this.diagram.startTransaction("reexpand");
      var level = 1;
      this.diagram.findTopLevelGroups().each(function (g) { expandGroups(g, 0, level); })
      this.diagram.commitTransaction("reexpand");
    }

    function finishDrop(e, grp) {
      var ok = (grp !== null
        ? grp.addMembers(grp.diagram.selection, true)
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
      if (!ok) e.diagram.currentTool.doCancel();
    }

    this.diagram.groupTemplateMap.add("OfGroups",
      $(go.Group, "Auto",
        {
          background: "transparent",
          mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,
          layout:
            $(go.GridLayout,
              {
                wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
              })
        },
        new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
        $(go.Shape, "Rectangle",
          { fill: null, stroke: "#FFDD33", strokeWidth: 2 }),
        $(go.Panel, "Vertical",
          $(go.Panel, "Horizontal",
            { stretch: go.GraphObject.Horizontal, background: "#FFDD33" },
            $("SubGraphExpanderButton",
              { alignment: go.Spot.Right, margin: 5 }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 18px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
              },
              new go.Binding("text", "text").makeTwoWay())
          ),
          $(go.Placeholder,
            { padding: 5, alignment: go.Spot.TopLeft })
        )
      ));

    this.diagram.groupTemplateMap.add("OfNodes",
      $(go.Group, "Auto",
        {
          background: "transparent",
          ungroupable: true,
          mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true,
          layout:
            $(go.GridLayout,
              {
                wrappingColumn: 1, alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
              })
        },
        new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
        $(go.Shape, "Rectangle",
          { fill: null, stroke: "#33D3E5", strokeWidth: 2 }),
        $(go.Panel, "Vertical",
          $(go.Panel, "Horizontal",
            { stretch: go.GraphObject.Horizontal, background: "#33D3E5" },
            $("SubGraphExpanderButton",
              { alignment: go.Spot.Right, margin: 5 }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 16px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
              },
              new go.Binding("text", "text").makeTwoWay())
          ),
          $(go.Placeholder,
            { padding: 5, alignment: go.Spot.TopLeft })
        )
      ));


    this.diagram.nodeTemplate =
    $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape,
      {
        fill: "gray", strokeWidth: 0,
        portId: "", cursor: "pointer",
        fromLinkable: true, toLinkable: true,
        fromLinkableSelfNode: true, toLinkableSelfNode: true,
        fromLinkableDuplicates: true, toLinkableDuplicates: true
      },
      new go.Binding("fill", "color")),
    $(go.TextBlock,
      { margin: 8, editable: true },
      new go.Binding("text").makeTwoWay())
  );

    this.diagram.linkTemplate =
      $(go.Link,
        { relinkableFrom: true, relinkableTo: true },
        $(go.Shape),
        $(go.Shape, { toArrow: "OpenTriangle" })
      );

    this.diagram.groupTemplate = $(go.Group, "Auto",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape,
        {
          fill: "white", strokeWidth: 0,
          portId: "", cursor: "pointer",
          fromLinkable: true, toLinkable: true,
          fromLinkableSelfNode: true, toLinkableSelfNode: true,
          fromLinkableDuplicates: true, toLinkableDuplicates: true
        },
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        { margin: 8, editable: true },
        new go.Binding("text").makeTwoWay())
    );


    this.palette = new go.Palette();
    this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

    this.palette.model.nodeDataArray =
      [
        { text: "Alpha", color: "lightblue" },
        { text: "Beta", color: "orange" },
        { text: "Gamma", color: "lightgreen" },
        { text: "Delta", color: "pink" },
        { text: "Epsilon", color: "yellow" }
      ];

  }

  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;
    this.palette.div = this.paletteRef.nativeElement;
    this.load();
  }

  load() {
    this.diagram.model = go.Model.fromJson(this.savedModel.nativeElement.innerHTML);
  }

}
