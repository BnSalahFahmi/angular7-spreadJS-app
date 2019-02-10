import { Component, OnInit, Input } from '@angular/core';
import * as GC from "@grapecity/spread-sheets";
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'spread-view-container',
  templateUrl: './spread-view-container.component.html',
  styleUrls: ['./spread-view-container.component.css']
})
export class SpreadViewComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit() {
  }

}
