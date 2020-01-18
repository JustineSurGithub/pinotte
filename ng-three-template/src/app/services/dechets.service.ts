import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DechetsService {

  dechetAddingTimer = new BehaviorSubject(0);

  startDechetStackUpdates(): any {
    window.setInterval(() => {
      this.dechetAddingTimer.next(0);
    }, 1000);
  }

  constructor() { }

}
