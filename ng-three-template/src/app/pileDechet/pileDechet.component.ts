import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DechetsService } from '../services/dechets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.component.html',
  styleUrls: ['./pileDechet.component.scss']
})
export class PileDechetComponent implements OnInit {

  private readonly MAX_SIZE = 8;
  private pile: number[] = [];
  subscriptions: Subscription[] = [];

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
    this.pile = [...this.pile, dechetId];
  }

   popFromPile(): number {
    return this.pile.pop();
  }

  ngOnInit() {
    this.pile = [0, 8, 8, 18, 27, 8, 0, 0];

    const s = this.dechetsService.dechetAddingTimer.subscribe(() => {
      //this.addToPile(this.pile[this.pile.length - 1] + 1);
    });
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
