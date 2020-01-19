import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Clock } from 'three';
import { collectExternalReferences } from '@angular/compiler';
import { DechetsService } from './dechets.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private dechetService: DechetsService) {
   }

  gameInProgress = false;
  startGame() {
    // this.gameInProgress = true;
    this.dechetService.startDechetStackUpdates();
    console.log('Game starting');
  }

  stopGame(): any {
    console.log('Game stopping');
    this.dechetService.stopDechetStackUpdates();
  }

  toggleGameState(): void {
    this.gameInProgress ? this.stopGame() : this.startGame();
    this.gameInProgress = !this.gameInProgress;
  }

}
