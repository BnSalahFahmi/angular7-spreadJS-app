import { Component, OnInit } from '@angular/core';
import * as GC from "@grapecity/spread-sheets";
//import {saveAs} from 'file-saver';
//GC.Spread.Sheets.LicenseKey = 'x.x.x.x.x.x.x.x.x.x.x.x.x.x.x';

@Component({
  selector: 'cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  spread: GC.Spread.Sheets.Workbook;
  excelIO;
  hostStyle = {
    width: '710px',
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

  constructor() {
    //this.excelIO = new Excel.IO();
  }

  ngOnInit() {
    // this.spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"),{sheetCount:3});
    // let sheet = this.spread.getActiveSheet();
    // sheet.getCell(0, 0).text("My SpreadJS Angular Transaction").foreColor("blue");
    //this.spread=new GC.Spread.Sheets.Workbook(document.getElementById("spread-demo"),{sheetCount:1}); 
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    var data = event.dataTransfer.getData("text");
    // do what you want with data
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
    let sheet = this.spread.getActiveSheet();
    this.bindSheetEvents(sheet);
    //var cell = sheet.getCell(1, 1);
    //cell.value("10/12/2018 11:00 PM");
    //cell.cellType(new DatePickerCellType());
    //sheet.getCell(0, 0).text("My SpreadJS Angular Transaction").foreColor("blue");
  }

  onDropEnd(event) {
    console.log('dropped');
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

}
