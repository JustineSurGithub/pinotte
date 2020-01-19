import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DechetsService } from '../services/dechets.service';
import { Subscription } from 'rxjs';
import { Dechet, DECHETS } from '../classes/dechet';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.component.html',
  styleUrls: ['./pileDechet.component.scss']
})
export class PileDechetComponent implements OnInit, OnDestroy {

  private readonly MAX_SIZE = 8;
  private pile: Dechet[] = [];
  subscriptions: Subscription[] = [];

  constructor(private dechetsService: DechetsService) {
  }

  idToUrlImage(id: number) {
    return `/assets/${id}.png`;
  }

  addToPile(dechet: Dechet) {
    if (this.pile.length > this.MAX_SIZE) {
      // TODO: update game logic: the game has ended

      return;
    }
    this.pile = [...this.pile, dechet];
  }

   popFromPile(): Dechet {
    return this.pile.pop();
  }

  ngOnInit() {
    // this.pile = [0, 8, 8, 18, 27, 8, 0, 0];
    this.pile = [DECHETS[0], DECHETS[1], DECHETS[1], DECHETS[2], DECHETS[1], DECHETS[0], DECHETS[0]];

    const s = this.dechetsService.dechetAddingTimer.subscribe(() => {
      // this.addToPile(this.pile[this.pile.length - 1] + 1);
    });
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
