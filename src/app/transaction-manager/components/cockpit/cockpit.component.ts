import { Component, OnInit } from '@angular/core';
//import {saveAs} from 'file-saver';
//GC.Spread.Sheets.LicenseKey = 'x.x.x.x.x.x.x.x.x.x.x.x.x.x.x';

@Component({
  selector: 'cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
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

  getSpread(){
    //var spread = GC.Spread.Sheets.findControl(document.getElementById("spreadSheet"));
    alert(this.spread.getActiveSheet().name());
  }

  workbookInit(args) {
    this.spread = args.spread;
    let sheet = this.spread.getActiveSheet();
    sheet.getCell(0, 0).text("My SpreadJS Angular Transaction").foreColor("blue");
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
  //   const self = this;
  //   const filename = 'exportExcel.xlsx';
  //   const json = JSON.stringify(self.spread.toJSON());
  //   self.excelIO.save(json, function (blob) {
  //     saveAs(blob, filename);
  //   }, function (e) {
  //     console.log(e);
  //   });
  }

  onValueChanged(event){
    alert('yup');
  }

  onRowChanged(event){

  }

  onCellChanged(event){

  }

}
