import { TestBed } from '@angular/core/testing';

import { FatcalcService } from './fatcalc.service';

describe('FatcalcService', () => {
  let service: FatcalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FatcalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
