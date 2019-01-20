import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css']
})
export class TransactionInfoComponent implements OnInit {

  transactionName = "Test";
  creator = "Fahmi BEN SALAH";
  creationDate = "12/01/2019 14:14";
  simultaionNb = "10000";

  constructor() { }

  ngOnInit() {
  }

}
