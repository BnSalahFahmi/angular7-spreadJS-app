import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  url = "https://scorglobal.sharepoint.com/sites/ASDSWiki";

  constructor(private hostElement: ElementRef) { }

  ngOnInit(){
    const iframe = this.hostElement.nativeElement.querySelector('iframe');
    iframe.src = this.url;
   }

}
