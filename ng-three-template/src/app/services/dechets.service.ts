import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DechetsService {
  startDechetStackUpdates(): any {
    window.setInterval(() => {
      console.log('HELLO');
    }, 1000);
  }

  constructor() { }

}
