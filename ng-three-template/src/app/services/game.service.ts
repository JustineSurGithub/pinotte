import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Clock } from 'three';
import { collectExternalReferences } from '@angular/compiler';
import { DechetsService } from './dechets.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  clock = new THREE.Clock();

  constructor(private dechetService: DechetsService) {
   }

  gameInProgress = false;
  startGame() {
    this.gameInProgress = true;
    this.clock.start();

    this.dechetService.startDechetStackUpdates();
    console.log('Game starting');
  }

}
