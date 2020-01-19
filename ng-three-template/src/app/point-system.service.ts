import { Injectable } from '@angular/core';
import { Bin } from './classes/bin';
import { Dechet, DECHETS } from './classes/dechet';
// TODO: Use a factory to better handle the scores and allow better
// calculation.
@Injectable({
  providedIn: 'root'
})
export class PointSystemService {
  // Map correct classification to point
  public readonly scoreMap: Map<Dechet, number>;
  // Map dechet to the right bin
  public readonly correctBinMap: Map<Dechet, Bin>;
  // Check: maybe put other 0 depending if a penalty is wanted
  private readonly INCORRECT_GUESS_POINTS = 0;

  constructor() {
    this.scoreMap = new Map();
    this.scoreMap.set(DECHETS[0], 1);
    this.scoreMap.set(DECHETS[1], 1);
    this.scoreMap.set(DECHETS[2], 1);
    this.scoreMap.set(DECHETS[3], 1);

    // TODO Move this AND set right values
    this.correctBinMap = new Map<Dechet, Bin>();
    this.correctBinMap.set(DECHETS[0], Bin.Waste);
    this.correctBinMap.set(DECHETS[1], Bin.Waste);
    this.correctBinMap.set(DECHETS[2], Bin.Waste);
    this.correctBinMap.set(DECHETS[3], Bin.Waste);
  }

  // TODO: Type the bins
  public scoreForClassification(dechet: Dechet, bin: Bin): number {
    const correctBin = this.correctBinMap.get(dechet);
    if (correctBin !== bin) {
      return this.INCORRECT_GUESS_POINTS;
    } else {
      return this.scoreMap.get(dechet);
    }
  }
}
