import { Injectable } from '@angular/core';
import { Bin } from './classes/bin';
// TODO: Use a factory to better handle the scores and allow better
// calculation.
@Injectable({
  providedIn: 'root'
})
export class PointSystemService {
  // Map correct classification to point
  public readonly scoreMap: Map<number, number>;
  // Map dechet to the right bin
  public readonly correctBinMap: Map<number, Bin>;
  // Check: maybe put other 0 depending if a penalty is wanted
  private readonly INCORRECT_GUESS_POINTS = 0;

  constructor() {
    this.scoreMap = new Map();
    this.scoreMap.set(0, 1);
    this.scoreMap.set(8, 1);
    this.scoreMap.set(18, 1);
    this.scoreMap.set(27, 1);

    // TODO Move this AND set right values
    this.correctBinMap = new Map<number, Bin>();
    this.correctBinMap.set(0, Bin.Waste);
    this.correctBinMap.set(8, Bin.Waste);
    this.correctBinMap.set(18, Bin.Waste);
    this.correctBinMap.set(27, Bin.Waste);
  }

  // TODO: Type the bins
  public scoreForClassification(dechet: number, bin: Bin): number {
    const correctBin = this.correctBinMap.get(dechet);
    if (correctBin !== bin) {
      return this.INCORRECT_GUESS_POINTS;
    } else {
      return this.scoreMap.get(dechet);
    }
  }
}
