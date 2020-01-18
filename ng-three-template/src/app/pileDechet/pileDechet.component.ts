import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.html'
})
export class PileDechetComponent implements OnInit {


  pile: number[] = [];
  top = 0;

  constructor() {
  }


  addToPile(dechetId: number) {
    this.pile.push(dechetId);
  }

   popFromPile(): number {
    return this.pile.pop();
  }

  ngOnInit() {
    this.addToPile(1);
    this.addToPile(2);
    this.addToPile(3);
    this.addToPile(4);
    this.addToPile(5);
    this.popFromPile();
    this.popFromPile();
    this.addToPile(6);
    this.addToPile(7);
    console.log(this.popFromPile());
  }



}