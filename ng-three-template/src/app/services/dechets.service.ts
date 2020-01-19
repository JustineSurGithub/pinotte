import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, interval, Observable, NEVER, of } from 'rxjs';
import { skipWhile, skip, map, switchMap } from 'rxjs/operators';

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
