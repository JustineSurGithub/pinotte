import { Injectable } from '@angular/core';
import { DechetsService } from './dechets.service';
import { Dechet, DECHETS } from '../classes/dechet';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly MAX_SIZE = 8;
  public pile: Subject<Dechet[]>;
  private _pile = [];
  subscriptions: Subscription[] = [];

  public points = 0;

  constructor(private dechetsService: DechetsService) {
    this.pile = new Subject();
    this._pile = [DECHETS[0], DECHETS[1], DECHETS[1], DECHETS[2]];
    const s = this.dechetsService.dechetAddingTimer.subscribe((newDechet: Dechet) => {
      this.addToPile(newDechet);
    });
    this.subscriptions.push(s);
    // TODO : Move
    document.body.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.toggleGameState();
      }
    });
  }

  gameInProgress = false;
  gameover = false;
  startGame() {
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

  getGameStatus(): boolean {
    return this.gameInProgress;
  }

  private addToPile(dechet: Dechet) {
    if (this._pile.length >= this.MAX_SIZE) {
      console.log('stopping');
      console.log(this._pile.length);
      this.stopGame();
      this.gameover = true;
      return;
    }
    this._pile.push(dechet);
    this.pile.next(this._pile);
  }

  public hasContentInPile(): boolean {
    return this._pile.length > 0;
  }

  // TODO: remove hack
   popFromPile(): Dechet {
    const top = _.first(this._pile);
    if (top === undefined) {
      console.log(`[popFromPilke] There is no element in the stack...`);
      return undefined;
    } else {
      const f = this._pile.shift();
      this.pile.next(this._pile);
      console.assert(f === top, 'f and top are not the same');
      return top;
    }
  }

  private cancelSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
