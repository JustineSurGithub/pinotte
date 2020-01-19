import { Injectable } from '@angular/core';
import { interval, NEVER, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DechetsService {

  dechetAddingTimer: any;
  isStarted = false;

  startDechetStackUpdates(): void {
    this.isStarted = true;

  }
  stopDechetStackUpdates(): void {
    this.isStarted = false;
  }
  constructor() {
    this.dechetAddingTimer = interval(1000).pipe(
      switchMap(() => {
        return this.isStarted ? of(0) : NEVER;
      })
    );
  }

}
