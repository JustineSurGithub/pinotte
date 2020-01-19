import { Injectable } from '@angular/core';
import { Bin } from './classes/bin';
import { Dechet, DECHETS } from './classes/dechet';
// TODO: Use a factory to better handle the scores and allow better
// calculation.
@Injectable({
  providedIn: 'root'
})
export class PointSystemService {

  // Check: maybe put other 0 depending if a penalty is wanted
  private readonly INCORRECT_GUESS_POINTS = 0;
  private readonly DEFAULT_POINTS: number = 1000;

  constructor() { }

  public scoreForClassification(dechet: Dechet, bin: Bin): number {
    return dechet.bin !== bin ? this.INCORRECT_GUESS_POINTS : this.DEFAULT_POINTS;
  }
}
