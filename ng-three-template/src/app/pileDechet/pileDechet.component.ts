import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.html'
})
export class pileDechetComponent implements OnInit {


  pile : Number[] = [];

  constructor() {
    
  }


  ngOnInit() {
    this.pile = [1, 2, 3, 4, 5, 6, 7]
  }

}