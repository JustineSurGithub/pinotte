import { TestBed } from '@angular/core/testing';

import { PointSystemService } from './point-system.service';
import { Bin } from './classes/bin';
import { DECHETS } from './classes/dechet';

describe('PointSystemService', () => {
  const MISCLASSIFICATION_EXPECTED_SCORE = 0;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointSystemService = TestBed.get(PointSystemService);
    expect(service).toBeTruthy();
  });

  it('should return 0 for an incorrect classification', () => {
    const service: PointSystemService = TestBed.get(PointSystemService);
    const item = DECHETS[0];
    const incorrectBin = Bin.Compost;

    const score = service.scoreForClassification(item, incorrectBin);
    expect(score).toEqual(MISCLASSIFICATION_EXPECTED_SCORE);
  });

  it('should return a positive value for an incorrect classification', () => {
    const service: PointSystemService = TestBed.get(PointSystemService);
    const item = DECHETS[0];
    const correctBin = Bin.Waste;

    const score = service.scoreForClassification(item, correctBin);
    expect(score).toBeGreaterThan(MISCLASSIFICATION_EXPECTED_SCORE);
    expect(score).toEqual(service.correctBinMap.get(item));
    expect(score).toEqual(1);
  });
});
