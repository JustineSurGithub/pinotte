import { Component, OnInit } from '@angular/core';
import { DechetsService } from '../services/dechets.service';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.html'
})
export class PileDechetComponent implements OnInit {


  pile: number[] = [];
  top = 0;

  constructor(private dechetsService: DechetsService) {
  }


  addToPile(dechetId: number) {
    this.pile.push(dechetId);
  }

   popFromPile(): number {
    return this.pile.pop();
  }

  ngOnInit() {
    this.pile = [1, 2, 3, 4, 5, 6, 7];

    this.dechetsService.dechetAddingTimer.subscribe(() => {
      console.log('Adding to pile');
      this.addToPile(this.pile[this.pile.length - 1] + 1);
      console.log(this.pile);
    });
  }

}
