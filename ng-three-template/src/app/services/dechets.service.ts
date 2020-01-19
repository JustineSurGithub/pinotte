import { Injectable } from '@angular/core';
import { interval, NEVER, of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Dechet, DECHETS } from '../classes/dechet';

@Injectable({
  providedIn: 'root'
})
export class DechetsService {

  dechetAddingTimer: Observable<Dechet>;
  isStarted = false;

  startDechetStackUpdates(): void {
    this.isStarted = true;

  }
  stopDechetStackUpdates(): void {
    this.isStarted = false;
  }

  generateRandomDechet(): Dechet {
    // TODO: Change
    return DECHETS[0];
  }

  constructor() {
    this.dechetAddingTimer = interval(1000).pipe(
      switchMap(() => {
        return this.isStarted ? of(this.generateRandomDechet()) : NEVER;
      })
    );
  }

}
