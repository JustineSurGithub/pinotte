import { Injectable } from '@angular/core';
import { DechetsService } from './dechets.service';
import { Dechet, DECHETS } from '../classes/dechet';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly MAX_SIZE = 8;
  public pile: BehaviorSubject<Dechet[]>;
  subscriptions: Subscription[] = [];

  constructor(private dechetsService: DechetsService) {
    this.pile = new BehaviorSubject([DECHETS[0], DECHETS[1], DECHETS[1], DECHETS[2]]);
    const s = this.dechetsService.dechetAddingTimer.subscribe((newDechet: Dechet) => {
      this.addToPile(newDechet);
    });
    this.subscriptions.push(s);
  }

  gameInProgress = false;
  startGame() {
    // this.gameInProgress = true;
    this.dechetsService.startDechetStackUpdates();
    console.log('Game starting');
  }

  stopGame(): any {
    console.log('Game stopping');
    this.dechetsService.stopDechetStackUpdates();
  }

  toggleGameState(): void {
    this.gameInProgress ? this.stopGame() : this.startGame();
    this.gameInProgress = !this.gameInProgress;
  }

  addToPile(dechet: Dechet) {
    if (this.pile.value.length >= this.MAX_SIZE) {
      console.log('stopping');
      console.log(this.pile.value.length);
      this.stopGame();
      return;
    }
    this.pile.next([...this.pile.value, dechet]);
  }

  seekPile(): number {
    const dechet = this.popFromPile();
    this.addToPile(dechet);
    return dechet.id;
  }

   popFromPile(): Dechet {
    // TODO: remove hack
    const withoutFirst = Array.from(this.pile.value);
    const elem = withoutFirst.shift();
    this.pile.next(withoutFirst);
    return elem;
  }

  private cancelSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
