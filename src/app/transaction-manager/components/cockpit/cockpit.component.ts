import { Component, OnInit, Input } from '@angular/core';
import * as GC from "@grapecity/spread-sheets";
import { GlobalService } from '../../../shared/services/global.service';
import { Transaction } from '../../models/transaction.model';
import { getValueByType } from '../../utils/Utils';
//import {saveAs} from 'file-saver';
//GC.Spread.Sheets.LicenseKey = 'x.x.x.x.x.x.x.x.x.x.x.x.x.x.x';

@Component({
  selector: 'cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  @Input() transaction: Transaction;

  spread: GC.Spread.Sheets.Workbook;
  sheetMenus = [];
  excelIO;
  hostStyle = {
    width: '100%',
    height: '430px'
  };
  newTabVisible = true;
  tabStripVisible = true;
  showHorizontalScrollbar = true;
  showVerticalScrollbar = true;
  allowUserZoom = true;
  allowUserResize = true;
  spreadBackColor = '#FFFFFF';
  grayAreaBackColor = '#E4E4E4';
  data: any;
  autoGenerateColumns = false;

  constructor(private globalService: GlobalService) {
    
  }

  ngOnInit() {
    this.globalService.refreshSpreadSheetEvent.subscribe(refresh => {
      if(refresh && this.spread){
        setTimeout(function () {
          this.spread.refresh();
        }, 1000);
      }
    })
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    var receivedData = event.dataTransfer.getData("node");
    var data = JSON.parse(receivedData);
    var canvas = document.getElementById('vp_vp');
    var coordinate = canvas.getBoundingClientRect();
    var clientX = event.clientX - coordinate.left;
    var clientY = event.clientY - coordinate.top + window.pageYOffset;
    var result = this.spread.hitTest(clientX, clientY);
    var pos = result.worksheetHitInfo;
    this.initCell(pos, data);
  }

  initCell(position, data){
    var row = position.row;
    var cell = position.col;
    this.spread.suspendPaint();
    this.spread.getActiveSheet().setValue(row, cell, getValueByType(data.name));
    this.spread.getActiveSheet().setValue(row + 1, cell, "Param 1");
    this.spread.getActiveSheet().setValue(row + 1, cell + 1, getValueByType(data.param1));
    this.spread.getActiveSheet().setValue(row + 2, cell, "Param 2");
    this.spread.getActiveSheet().setValue(row + 2, cell + 1, getValueByType(data.param2));
    this.spread.resumePaint();
  }

  onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  getSpread() {
    //var spread = GC.Spread.Sheets.findControl(document.getElementById("spreadSheet"));
    return this.spread;
  }

  workbookInit(args) {
    this.spread = args.spread;
    this.initSpreadSheet(this.spread);
    let sheet = this.spread.getActiveSheet();
    this.bindSheetEvents(sheet);
  }

  onFileChange(args) {
    let self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (self.spread && file) {
      self.excelIO.open(file, (json) => {
        self.spread.fromJSON(json, {});
        setTimeout(() => {
          alert("load successfully");
        }, 0);
      }, (error) => {
        alert('load fail');
      });
    }
  }

  // Excel export
  onClickMe(args) {
    const self = this;
    const filename = 'exportExcel.xlsx';
    const json = JSON.stringify(self.spread.toJSON());
    self.excelIO.save(json, function (blob) {
      //saveAs(blob, filename);
    }, function (e) {
      console.log(e);
    });
  }

  bindSheetEvents(sheet) {
    /* CellChanged Event */
    sheet.bind(GC.Spread.Sheets.Events.CellChanged, function (e, info) {
      if (info.propertyName === "value") {
        //TODO
      }
    });

    /* CellClick Event */
    sheet.bind(GC.Spread.Sheets.Events.CellClick, function (e, info) {
      //TODO
    });

    /* CellDoubleClick Event */
    sheet.bind(GC.Spread.Sheets.Events.CellDoubleClick, function (e, info) {
      //TODO
    });

    /* DragDropBlock Event */
    sheet.bind(GC.Spread.Sheets.Events.DragDropBlock, function (e, info) {
      //TODO
    });

    /* DragDropBlockCompleted Event */
    sheet.bind(GC.Spread.Sheets.Events.DragDropBlockCompleted, function (e, info) {
      //TODO
    });

    /* DragFillBlock Event */
    sheet.bind(GC.Spread.Sheets.Events.DragFillBlock, function (e, info) {
      //TODO
    });

    /* DragFillBlockCompleted Event */
    sheet.bind(GC.Spread.Sheets.Events.DragFillBlockCompleted, function (e, info) {
      //TODO
    });

    /* EditStarting Event */
    sheet.bind(GC.Spread.Sheets.Events.EditStarting, function (e, info) {
      //TODO
    });

    /* EditChange Event */
    sheet.bind(GC.Spread.Sheets.Events.EditChange, function (e, info) {
      //TODO
    });

    /* EditEnded Event */
    sheet.bind(GC.Spread.Sheets.Events.EditEnded, function (e, info) {
      //TODO
    });

    /* EnterCell Event */
    sheet.bind(GC.Spread.Sheets.Events.EnterCell, function (e, info) {
      //TODO
    });

    /* LeaveCell Event */
    sheet.bind(GC.Spread.Sheets.Events.LeaveCell, function (e, info) {
      //TODO
    });

    /* SheetNameChanging Event */
    sheet.bind(GC.Spread.Sheets.Events.SheetNameChanging, function (e, info) {
      //TODO
    });

    /* SheetNameChanged Event */
    sheet.bind(GC.Spread.Sheets.Events.SheetNameChanged, function (e, info) {
      //TODO
    });

    /* SheetTabClick Event */
    sheet.bind(GC.Spread.Sheets.Events.SheetTabClick, function (e, info) {
      //TODO
    });

    /* UserFormulaEntered Event */
    sheet.bind(GC.Spread.Sheets.Events.UserFormulaEntered, function (e, info) {
      //TODO
    });
  }

  unbindAllSpreadEvents(sheet) {
    this.spread.unbindAll();
  }

  unbindSpreadEvent(event) {
    //this.spread.unbind(GC.Spread.Sheets.Events.CellChanged);
    this.spread.unbind(event);
  }

  initSpreadSheet = function (spread) {

    spread.options.highlightInvalidData = true;
    spread.options.allowCopyPasteExcelStyle = true;
    spread.options.allowExtendPasteRange = true;
    spread.getActiveSheet().options.allowCellOverflow = false;

    spread.commandManager().setShortcutKey(undefined, GC.Spread.Commands.Key.c, true, false, false, false);
    spread.commandManager().setShortcutKey(undefined, GC.Spread.Commands.Key.x, true, false, false, false);
    spread.commandManager().setShortcutKey(undefined, GC.Spread.Commands.Key.del, false, false, false, false);

    spread.commandManager().register("customCut", function () {
      //TODO
      //spread.commandManager().execute({ cmd: "cut", sheetName: spread.getActiveSheet().name(), ranges: [new GC.Spread.Sheets.Range(fromRow, fromCol, toRow, toCol)] });
    }, GC.Spread.Commands.Key.x, true, false, false, false);

    spread.commandManager().register("customCopy", function () {
      //TODO
      //spread.commandManager().execute({ cmd: "copy", sheetName: spread.getActiveSheet().name(), ranges: [new GC.Spread.Sheets.Range(fromRow, fromCol, toRow, toCol)] });
    }, GC.Spread.Commands.Key.c, true, false, false, false);

    spread.commandManager().register("customDel", function () {
      // TODO
    }, GC.Spread.Commands.Key.del, false, false, false, false);

    spread.commandManager().register('addRows', function addRowAction() {
      //TODOD
    });
    spread.commandManager().register('deleteCols', function deleteRowAction() {
      //TODO
    });
    var deleteRowAction = function () {
      //TODO
    }
    spread.commandManager().register('clearContent', deleteRowAction);
    spread.commandManager().register('enterFormula', function formulaAction() {

    });
    spread.commandManager().register('showNode', function showNodeAction() {
      //todo
    });

    spread.commandManager().register('deleteSpreadSheet', function deleteSheetAction() {
      //TODO
    });




    spread.commandManager().register('showSpreadSheet', function showNodeAction() {
      //TODO
    });

    var customCopy = {
      text: 'Copy',
      name: 'customCopy',
      command: 'customCopy',
      workArea: 'viewportcolHeaderrowHeaderslicercorner'
    };

    var customCut = {
      text: 'Cut',
      name: 'customCut',
      command: 'customCut',
      workArea: 'viewportcolHeaderrowHeaderslicercorner'
    };

    var insertRows = {
      text: 'Insert',
      name: 'insertRows',
      command: 'addRows',
      workArea: 'rowHeader'
    };
    var insertCols = {
      text: 'Insert',
      name: 'addCols',
      command: 'addCols',
      workArea: 'colHeader'
    };
    var deleteRows = {
      text: 'Delete',
      name: 'deleteRows',
      command: 'deleteRows',
      workArea: 'rowHeader'
    };
    var deleteCols = {
      text: 'Delete',
      name: 'deleteCols',
      command: 'deleteCols',
      workArea: 'colHeader'
    };
    var clearContent = {
      text: 'Clear Contents',
      name: 'clearContent',
      command: 'clearContent',
      workArea: 'rowHeader'
    };
    var clearContent = {
      text: 'Clear Contents',
      name: 'clearContent',
      command: 'clearContent',
      workArea: 'colHeader'
    };
    var clearContent = {
      text: 'Clear Contents',
      name: 'clearContent',
      command: 'clearContent',
      workArea: 'viewport'
    };
    var enterFormula = {
      text: 'Enter Formula',
      name: 'enterFormula',
      command: 'enterFormula',
      iconClass: "gc-spread-pasteFormulas",
      workArea: 'viewport'
    };
    var showNode = {
      text: 'Show Node',
      name: 'showNode',
      command: 'showNode',
      iconClass: "gc-spread-viewNode",
      workArea: 'viewport'
    };

    var insertSheet = {
      text: 'Insert',
      name: 'insertSheet',
      command: 'insertSpreadSheet',
      workArea: 'sheetTab'
    };

    var deleteSheet = {
      text: 'Delete',
      name: 'deleteSheet',
      command: 'deleteSpreadSheet',
      workArea: 'sheetTab'
    };

    var separator = {
      type: 'separator'
    };
    for (var i = 0; i < spread.contextMenu.menuData.length; i++) {
      if (spread.contextMenu.menuData[i].name == 'gc.spread.copy') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, customCopy);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.cut') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, customCut);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.insertRows') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, insertRows);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.insertColumns') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, insertCols);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.deleteRows') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, deleteRows);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.deleteColumns') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, deleteCols);
      }
      if (spread.contextMenu.menuData[i].text == 'Clear Contents') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, clearContent);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.hideSheet') {
        spread.contextMenu.menuData.splice(i, 1);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.unhideSheet') {
        spread.contextMenu.menuData.splice(i, 1);
      }
      if (spread.contextMenu.menuData[i].name == 'gc.spread.deleteSheet') {
        spread.contextMenu.menuData.splice(i, 1);
        this.insertArrayAt(spread.contextMenu.menuData, i, deleteSheet);
      }
    }

    //spread.contextMenu.menuData.push(enterFormula);
    //spread.contextMenu.menuData.push(separator);
    spread.contextMenu.menuData.push(showNode);
    spread.contextMenu.menuData.push(separator);
    var showSheets = {
      text: 'Show Sheets',
      name: 'showSheets',
      workArea: 'viewportcorner',
      iconClass: "gc-spread-pasteOptions",
      subMenu: this.getSubMenus()
    };

    var found = spread.contextMenu.menuData.find(function (element) {
      return element && element.name == 'showSheets';
    });
    if (found) {
      spread.contextMenu.menuData.splice(spread.contextMenu.menuData.indexOf(found), 1);
      spread.contextMenu.menuData.push(showSheets);
    } else {
      spread.contextMenu.menuData.push(showSheets);
    }
    for (let i in this.getSubMenus()) {
      if(this.sheetMenus[i]){
        var subMenuFound = spread.contextMenu.menuData.find(function (element) {
          return this && element && this.sheetMenus[i] && element.name == this.sheetMenus[i].name;
        });
        if (subMenuFound) {
          spread.contextMenu.menuData.splice(spread.contextMenu.menuData.indexOf(subMenuFound), 1);
          spread.contextMenu.menuData.push(Object.assign({ workArea: 'slicer' }, this.sheetMenus[i]));
        } else
          spread.contextMenu.menuData.push(Object.assign({ workArea: 'slicer' }, this.sheetMenus[i]));
      }
    }


  }

  getSubMenus = function () {
    for (var index in this.spread.sheets) {
      var sheet = this.spread.sheets[index];
      if (sheet.visible()) {
        this.sheetMenus.push({
          text: sheet.name(),
          name: sheet.name().replace(/\s+/g, ''),
          iconClass: "gc-spread-editComment",
          command: 'showSpreadSheet'
        });
      }
    }
    return this.sheetMenus;
  }

  insertAt(array, index) {
    var arrayToInsert = Array.prototype.splice.apply(arguments, [2]);
    return this.insertArrayAt(array, index, arrayToInsert);
  }

  insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
    return array;
  }

}
