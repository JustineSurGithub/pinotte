import { Component, OnInit } from '@angular/core';
import { DechetsService } from '../services/dechets.service';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.html'
})
export class PileDechetComponent implements OnInit {

  private readonly MAX_SIZE = 8;
  private pile: number[] = [];

  constructor(private dechetsService: DechetsService) {
  }

  idToUrlImage(id: number) {
    return `/assets/${id}.png`;
  }

  addToPile(dechetId: number) {
    if (this.pile.length > this.MAX_SIZE) {
      //TODO: update game logic: the game has ended

      return;
    }
    this.pile.push(dechetId);
  }

   popFromPile(): number {
    return this.pile.pop();
  }

  ngOnInit() {
    this.pile = [0, 8, 8, 18, 27, 8];

    this.dechetsService.dechetAddingTimer.subscribe(() => {
      console.log('Adding to pile');
      this.addToPile(this.pile[this.pile.length - 1] + 1);
      console.log(this.pile);
    });
  }

}
