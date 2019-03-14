import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as go from 'gojs';

import { GuidedDraggingTool } from 'gojs/extensionsTS/GuidedDraggingTool';

@Component({
  selector: 'graph-editor',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  private diagram: go.Diagram = new go.Diagram();
  private palette: go.Palette = new go.Palette();

  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;

  @ViewChild('paletteDiv')
  private paletteRef: ElementRef;

  private contextMenu

  @ViewChild('mySavedModel')
  private savedModel: ElementRef;

  // @Input()
  // get model(): go.Model { return this.diagram.model; }
  // set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<go.Node | null>();

  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  ngOnInit() {
    // this.diagram.div = this.diagramRef.nativeElement;
    // this.palette.div = this.paletteRef.nativeElement;
  }

  load() {
    this.diagram.model = go.Model.fromJson(this.savedModel.nativeElement.innerHTML);
  }

  // ngAfterViewInit() {
  //   const MAKE = go.GraphObject.make;
  //   this.diagram = new go.Diagram();
  //   this.diagram.initialContentAlignment = go.Spot.Center;
  //   this.diagram.allowDrop = true;
  //   this.diagram.allowGroup = true;
  //   this.diagram.allowCopy = true;
  //   this.diagram.undoManager.isEnabled = true;
  //   this.diagram.commandHandler.archetypeGroupData = { text: "Group", isGroup: true, color: "blue" };
  //   this.contextMenu = document.getElementById('contextMenu');

  //   function makeButton(text, action, visiblePredicate) {
  //     return MAKE("ContextMenuButton",
  //       MAKE(go.TextBlock, text),
  //       { click: action },
  //       visiblePredicate ? new go.Binding("visible", "", function (o, e) { return o.diagram ? visiblePredicate(o, e) : false; }).ofObject() : {});
  //   }

  //   function nodeInfo(d) {
  //     var str = "Node " + d.key + ": " + d.text + "\n";
  //     if (d.group)
  //       str += "member of " + d.group;
  //     else
  //       str += "top-level node";
  //     return str;
  //   }


  //   function linkInfo(d) {  // Tooltip info for a link data object
  //     return "Link:\nfrom " + d.from + " to " + d.to;
  //   }

  //   function groupInfo(adornment) {  // takes the tooltip or context menu, not a group node data object
  //     var g = adornment.adornedPart;  // get the Group that the tooltip adorns
  //     var mems = g.memberParts.count;
  //     var links = 0;
  //     g.memberParts.each(function(part) {
  //       if (part instanceof go.Link) links++;
  //     });
  //     return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
  //   }

  //   var myContextMenu = MAKE(go.HTMLInfo, {
  //     show: this.showContextMenu,
  //     mainElement: this.contextMenu
  //   });

  //   this.diagram.contextMenu = myContextMenu;
  //   this.diagram.toolManager.draggingTool = new GuidedDraggingTool();


  //   this.contextMenu.addEventListener("contextmenu", function (e) {
  //     e.preventDefault();
  //     return false;
  //   }, false);

  //   this.diagram.addDiagramListener("ChangedSelection",
  //     e => {
  //       const node = e.diagram.selection.first();
  //       this.nodeSelected.emit(node instanceof go.Node ? node : null);
  //     });
  //   this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));
  //   this.diagram.groupTemplateMap.add("OfGroups",
  //     MAKE(go.Group, "Auto",
  //       { contextMenu: myContextMenu },
  //       {
  //         background: "transparent",
  //         mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
  //         mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
  //         computesBoundsAfterDrag: true,
  //         mouseDrop: finishDrop,
  //         handlesDragDropForMembers: true,
  //         layout:
  //           MAKE(go.GridLayout,
  //             {
  //               wrappingWidth: Infinity, alignment: go.GridLayout.Position,
  //               cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
  //             })
  //       },
  //       new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
  //       MAKE(go.Shape, "Rectangle",
  //         { fill: null, stroke: "#FFDD33", strokeWidth: 2 }),
  //       MAKE(go.Panel, "Vertical",
  //         MAKE(go.Panel, "Horizontal",
  //           { stretch: go.GraphObject.Horizontal, background: "#FFDD33" },
  //           MAKE("SubGraphExpanderButton",
  //             { alignment: go.Spot.Right, margin: 5 }),
  //           MAKE(go.TextBlock,
  //             {
  //               alignment: go.Spot.Left,
  //               editable: true,
  //               margin: 5,
  //               font: "bold 18px sans-serif",
  //               opacity: 0.75,
  //               stroke: "#404040"
  //             },
  //             new go.Binding("text", "text").makeTwoWay())
  //         ),
  //         MAKE(go.Placeholder,
  //           { padding: 5, alignment: go.Spot.TopLeft })
  //       )
  //     ));

  //   this.diagram.groupTemplateMap.add("OfNodes",

  //     MAKE(go.Group, "Auto",
  //       { contextMenu: myContextMenu },
  //       {
  //         background: "transparent",
  //         ungroupable: true,
  //         mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
  //         mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
  //         computesBoundsAfterDrag: true,
  //         mouseDrop: finishDrop,
  //         handlesDragDropForMembers: true,
  //         layout:
  //           MAKE(go.GridLayout,
  //             {
  //               wrappingColumn: 1, alignment: go.GridLayout.Position,
  //               cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
  //             })
  //       },
  //       new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
  //       MAKE(go.Shape, "Rectangle",
  //         { fill: null, stroke: "#33D3E5", strokeWidth: 2 }),
  //       MAKE(go.Panel, "Vertical",
  //         MAKE(go.Panel, "Horizontal",
  //           { stretch: go.GraphObject.Horizontal, background: "#33D3E5" },
  //           MAKE("SubGraphExpanderButton",
  //             { alignment: go.Spot.Right, margin: 5 }),
  //           MAKE(go.TextBlock,
  //             {
  //               alignment: go.Spot.Left,
  //               editable: true,
  //               margin: 5,
  //               font: "bold 16px sans-serif",
  //               opacity: 0.75,
  //               stroke: "#404040"
  //             },
  //             new go.Binding("text", "text").makeTwoWay())
  //         ),
  //         MAKE(go.Placeholder,
  //           { padding: 5, alignment: go.Spot.TopLeft })
  //       )
  //     ));
  //   this.diagram.nodeTemplate =
  //     MAKE(go.Node, "Auto",
  //       { contextMenu: myContextMenu },
  //       { // dropping on a Node is the same as dropping on its containing Group, even if it's top-level
  //         mouseDrop: function (e, nod) { finishDrop(e, nod.containingGroup); },
  //         containingGroupChanged: rescale  // automatically adjust the scale of the node, depending on the nesting depth
  //       },
  //       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  //       MAKE(go.Shape,
  //         {
  //           fill: "gray", strokeWidth: 0,
  //           portId: "", cursor: "pointer",
  //           fromLinkable: true, toLinkable: true,
  //           fromLinkableSelfNode: true, toLinkableSelfNode: true,
  //           fromLinkableDuplicates: true, toLinkableDuplicates: true
  //         },
  //         new go.Binding("fill", "color")),
  //       MAKE(go.TextBlock,
  //         { margin: 8, editable: true },
  //         new go.Binding("text").makeTwoWay())
  //     );

  //   this.diagram.linkTemplate =
  //     MAKE(go.Link,
  //       { relinkableFrom: true, relinkableTo: true },
  //       MAKE(go.Shape),
  //       MAKE(go.Shape, { toArrow: "OpenTriangle" })
  //     );

  //   this.diagram.groupTemplate = MAKE(go.Group, "Auto",
  //     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  //     MAKE(go.Shape,
  //       {
  //         fill: "white", strokeWidth: 0,
  //         portId: "", cursor: "pointer",
  //         fromLinkable: true, toLinkable: true,
  //         fromLinkableSelfNode: true, toLinkableSelfNode: true,
  //         fromLinkableDuplicates: true, toLinkableDuplicates: true
  //       },
  //       new go.Binding("fill", "color")),
  //     MAKE(go.TextBlock,
  //       { margin: 8, editable: true },
  //       new go.Binding("text").makeTwoWay())
  //   );
  //   this.palette = new go.Palette();
  //   this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;
  //   this.palette.model.nodeDataArray =
  //     [
  //       { text: "Alpha", color: "lightblue" },
  //       { text: "Beta", color: "orange" },
  //       { text: "Gamma", color: "lightgreen" },
  //       { text: "Delta", color: "pink" },
  //       { text: "Epsilon", color: "yellow" }
  //     ];

  //   function highlightGroup(e, grp, show) {
  //     if (!grp) return;
  //     e.handled = true;
  //     if (show) {
  //       var tool = grp.diagram.toolManager.draggingTool;
  //       var map = tool.draggedParts || tool.copiedParts;
  //       if (grp.canAddMembers(map.toKeySet())) {
  //         grp.isHighlighted = true;
  //         return;
  //       }
  //     }
  //     grp.isHighlighted = false;
  //   }

  //   function finishDrop(e, grp) {
  //     var ok = (grp !== null
  //       ? grp.addMembers(grp.diagram.selection, true)
  //       : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
  //     if (!ok) e.diagram.currentTool.doCancel();
  //   }

  //   // Change the scale of each node, including groups and their member nodes,
  //   // depending on how deeply nested the node is.
  //   function rescale(node) {
  //     if (node instanceof go.Group) {
  //       node.findObject("HEADER").scale = 1 / (1 + node.findSubGraphLevel());
  //       node.memberParts.each(rescale)
  //     } else if (node instanceof go.Node) {
  //       node.scale = 1 / (1 + node.findSubGraphLevel());
  //     }
  //   }

  //   this.load();
  //   this.diagram.div = this.diagramRef.nativeElement;
  //   this.palette.div = this.paletteRef.nativeElement;
  // }

  // expandGroups(g, i, level) {
  //   if (!(g instanceof go.Group)) return;
  //   g.isSubGraphExpanded = i < level;
  //   g.memberParts.each(function (m) {
  //     this.expandGroups(m, i + 1, level);
  //   })
  // }
  // reexpand(e) {
  //   this.diagram.startTransaction("reexpand");
  //   var level = 1;
  //   this.diagram.findTopLevelGroups().each(function (g) { this.expandGroups(g, 0, level); })
  //   this.diagram.commitTransaction("reexpand");
  // }

  // showContextMenu(obj, diagram, tool) {
  //   var cmd = diagram.commandHandler;
  //   document.getElementById("cut").style.display = cmd.canCutSelection() ? "block" : "none";
  //   document.getElementById("copy").style.display = cmd.canCopySelection() ? "block" : "none";
  //   document.getElementById("paste").style.display = cmd.canPasteSelection() ? "block" : "none";
  //   document.getElementById("rename").style.display = cmd.canDeleteSelection() ? "block" : "none";
  //   document.getElementById("delete").style.display = cmd.canDeleteSelection() ? "block" : "none";
  //   document.getElementById("contextMenu").style.display = "block";
  //   var mousePt = diagram.lastInput.viewPoint;
  //   document.getElementById("contextMenu").style.left = mousePt.x + "px";
  //   document.getElementById("contextMenu").style.top = mousePt.y + 30 + "px";
  // }

  // changeColor(diagram, color) {
  //   diagram.startTransaction("change color");
  //   diagram.selection.each(function (node) {
  //     if (node instanceof go.Node) {
  //       var data = node.data;
  //       diagram.model.setDataProperty(data, "color", color);
  //     }
  //   });
  //   diagram.commitTransaction("change color");
  // }

  // cxcommand(event, val) {
  //   debugger;
  //   if (val === undefined) val = event.currentTarget.id;
  //   var diagram = this.diagram;
  //   switch (val) {
  //     case "cut": diagram.commandHandler.cutSelection(); break;
  //     case "copy": diagram.commandHandler.copySelection(); break;
  //     case "paste": diagram.commandHandler.pasteSelection(diagram.lastInput.documentPoint); break;
  //     case "delete": diagram.commandHandler.deleteSelection(); break;
  //     case "color": {
  //       var color = window.getComputedStyle(document.elementFromPoint(event.clientX, event.clientY).parentElement)['background-color'];
  //       this.changeColor(diagram, color); break;
  //     }
  //   }
  //   diagram.currentTool.stopTool();
  // }

  ngAfterViewInit() {
    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this

    var $ = go.GraphObject.make;  // for conciseness in defining templates

    this.diagram =
      $(go.Diagram, "diagramDiv",  // create a Diagram for the DIV HTML element
        {
          // allow double-click in background to create a new node
          "clickCreatingTool.archetypeNodeData": { text: "Node", color: "white" },

          // allow Ctrl-G to call groupSelection()
          "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },

          // enable undo & redo
          "undoManager.isEnabled": true
        });

    // Define the appearance and behavior for Nodes:

    // First, define the shared context menu for all Nodes, Links, and Groups.

    // To simplify this code we define a function for creating a context menu button:
    function makeButton(text, action, visiblePredicate) {
      return $("ContextMenuButton",
        $(go.TextBlock, text),
        { click: action },
        visiblePredicate ? new go.Binding("visible", "", function (o, e) { return o.diagram ? visiblePredicate(o, e) : false; }).ofObject() : {});
    }

    // a context menu is an Adornment with a bunch of buttons in them
    var partContextMenu =
      $("ContextMenu",
        makeButton("Properties",
          function (e, obj) {  // OBJ is this Button
            var contextmenu = obj.part;  // the Button is in the context menu Adornment
            var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
            // now can do something with PART, or with its data, or with the Adornment (the context menu)
            if (part instanceof go.Link) alert(linkInfo(part.data));
            else if (part instanceof go.Group) alert(groupInfo(contextmenu));
            else alert(nodeInfo(part.data));
          }, true),
        makeButton("Cut",
          function (e, obj) { e.diagram.commandHandler.cutSelection(); },
          function (o) { return o.diagram.commandHandler.canCutSelection(); }),
        makeButton("Copy",
          function (e, obj) { e.diagram.commandHandler.copySelection(); },
          function (o) { return o.diagram.commandHandler.canCopySelection(); }),
        makeButton("Paste",
          function (e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint); },
          function (o) { return o.diagram.commandHandler.canPasteSelection(); }),
        makeButton("Delete",
          function (e, obj) { e.diagram.commandHandler.deleteSelection(); },
          function (o) { return o.diagram.commandHandler.canDeleteSelection(); }),
        makeButton("Undo",
          function (e, obj) { e.diagram.commandHandler.undo(); },
          function (o) { return o.diagram.commandHandler.canUndo(); }),
        makeButton("Redo",
          function (e, obj) { e.diagram.commandHandler.redo(); },
          function (o) { return o.diagram.commandHandler.canRedo(); }),
        makeButton("Group",
          function (e, obj) { e.diagram.commandHandler.groupSelection(); },
          function (o) { return o.diagram.commandHandler.canGroupSelection(); }),
        makeButton("Ungroup",
          function (e, obj) { e.diagram.commandHandler.ungroupSelection(); },
          function (o) { return o.diagram.commandHandler.canUngroupSelection(); })
      );

    function nodeInfo(d) {  // Tooltip info for a node data object
      var str = "Node " + d.key + ": " + d.text + "\n";
      if (d.group)
        str += "member of " + d.group;
      else
        str += "top-level node";
      return str;
    }

    // These nodes have text surrounded by a rounded rectangle
    // whose fill color is bound to the node data.
    // The user can drag a node by dragging its TextBlock label.
    // Dragging from the Shape will start drawing a new link.
    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
        { locationSpot: go.Spot.Center },
        $(go.Shape, "Rectangle",
          {
            fill: "white", // the default fill, if there is no data bound value
            portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
            // allow all kinds of links from and to this port
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          {
            font: "bold 13px sans-serif",
            //stroke: '#333',
            margin: 8,  // make some extra space for the shape around the text
            isMultiline: false,  // don't allow newlines in text
            editable: true  // allow in-place editing by user
          },
          new go.Binding("text", "text").makeTwoWay()),  // the label shows the node data's text
        { // this tooltip Adornment is shared by all nodes
          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling nodeInfo(data)
                new go.Binding("text", "", nodeInfo))
            ),
          // this context menu Adornment is shared by all nodes
          contextMenu: partContextMenu
        }
      );

    // Define the appearance and behavior for Links:

    function linkInfo(d) {  // Tooltip info for a link data object
      return "Link:\nfrom " + d.from + " to " + d.to;
    }

    // The link shape and arrowhead have their stroke brush data bound to the "color" property
    this.diagram.linkTemplate =
      $(go.Link,
        { toShortLength: 3, relinkableFrom: true, relinkableTo: true },  // allow the user to relink existing links
        $(go.Shape,
          { strokeWidth: 2 },
          new go.Binding("stroke", "color")),
        $(go.Shape,
          { toArrow: "Standard", stroke: null },
          new go.Binding("fill", "color")),
        { // this tooltip Adornment is shared by all links
          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
                new go.Binding("text", "", linkInfo))
            ),
          // the same context menu Adornment is shared by all links
          contextMenu: partContextMenu
        }
      );

    // Define the appearance and behavior for Groups:

    function groupInfo(adornment) {  // takes the tooltip or context menu, not a group node data object
      var g = adornment.adornedPart;  // get the Group that the tooltip adorns
      var mems = g.memberParts.count;
      var links = 0;
      g.memberParts.each(function (part) {
        if (part instanceof go.Link) links++;
      });
      return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
    }

    // Groups consist of a title in the color given by the group node data
    // above a translucent gray rectangle surrounding the member parts
    this.diagram.groupTemplate =
      $(go.Group, "Vertical",
      { selectionObjectName: "PH",
        locationObjectName: "PH",
        resizable: true,
        resizeObjectName: "PH" },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
          mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
          mouseDrop: finishDrop,
          selectionObjectName: "PANEL",  // selection handle goes around shape, not label
          ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
          layout:
              $(go.GridLayout,
                {
                  wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                  cellSize: new go.Size(10, 10), spacing: new go.Size(10, 4),
                })
        },
        new go.Binding("background", "isHighlighted", function(h) { return h ? "rgba(255,0,0,0.2)" : "#afeeee"; }).ofObject(),
          $(go.Panel, "Vertical",  // title above Placeholder
          $(go.Panel, "Horizontal",  // button next to TextBlock
            { stretch: go.GraphObject.Horizontal, background: "#2a9396" },
            $("SubGraphExpanderButton",
              { alignment: go.Spot.Left, margin: 5 }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Left,
                editable: true,
                margin: 5,
                font: "bold 14px sans-serif",
                opacity: 1,
                stroke: "#404040",
              },
              new go.Binding("text", "text").makeTwoWay())
          ),
          $(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
        ),
        { // this tooltip Adornment is shared by all groups
          toolTip:
            $("ToolTip",
              $(go.TextBlock, { margin: 4 },
                // bind to tooltip, not to Group.data, to allow access to Group properties
                new go.Binding("text", "", groupInfo).ofObject())
            ),
          // the same context menu Adornment is shared by all groups
          contextMenu: partContextMenu
        }
      );

    // Define the behavior for the Diagram background:

    function diagramInfo(model) {  // Tooltip info for the diagram's model
      return "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
    }

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

    function finishDrop(e, grp) {
      var ok = (grp !== null
        ? grp.addMembers(grp.diagram.selection, true)
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
      if (!ok) e.diagram.currentTool.doCancel();
    }

    // provide a tooltip for the background of the Diagram, when not over any Part
    this.diagram.toolTip =
      $("ToolTip",
        $(go.TextBlock, { margin: 4 },
          new go.Binding("text", "", diagramInfo))
      );

    // provide a context menu for the background of the Diagram, when not over any Part
    this.diagram.contextMenu =
      $("ContextMenu",
        makeButton("Paste",
          function (e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint); },
          function (o) { return o.diagram.commandHandler.canPasteSelection(); }),
        makeButton("Undo",
          function (e, obj) { e.diagram.commandHandler.undo(); },
          function (o) { return o.diagram.commandHandler.canUndo(); }),
        makeButton("Redo",
          function (e, obj) { e.diagram.commandHandler.redo(); },
          function (o) { return o.diagram.commandHandler.canRedo(); })
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

    // Create the Diagram's Model:
    var nodeDataArray = [
      { key: 1, text: "Alpha", color: "lightblue" },
      { key: 2, text: "Beta", color: "orange" },
      { key: 3, text: "Gamma", color: "lightgreen", group: 5 },
      { key: 4, text: "Delta", color: "pink", group: 5 },
      { key: 5, text: "Epsilon", color: "green", isGroup: true }
    ];
    var linkDataArray = [
      { from: 1, to: 2, color: "blue" },
      { from: 2, to: 2 },
      { from: 3, to: 4, color: "green" },
      { from: 3, to: 1, color: "purple" }
    ];
    this.diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    this.palette.div = this.paletteRef.nativeElement;
    this.diagram.addDiagramListener("ChangedSelection",
      e => {
        const node = e.diagram.selection.first();
        this.nodeSelected.emit(node instanceof go.Node ? node : null);
      });
    this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));
  }

}
