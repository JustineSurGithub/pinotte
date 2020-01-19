import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DechetsService } from '../services/dechets.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.html'
})
export class PileDechetComponent implements OnInit, OnDestroy {

  pile: number[] = [];
  top = 0;
  subscriptions: Subscription[] = [];

  constructor(private dechetsService: DechetsService, private cd: ChangeDetectorRef) {
  }


  addToPile(dechetId: number) {
    this.pile = [...this.pile, dechetId];
  }

   popFromPile(): number {
    return this.pile.pop();
  }

  ngOnInit() {
    this.pile = [1, 2, 3, 4, 5, 6, 7];

    const s = this.dechetsService.dechetAddingTimer.subscribe(() => {
      this.addToPile(this.pile[this.pile.length - 1] + 1);
    });
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
