import { TestBed, inject } from '@angular/core/testing';

import { FakeFridgeService } from './fake-fridge.service';

describe('FakeFridgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeFridgeService]
    });
  });

  it('should be created', inject([FakeFridgeService], (service: FakeFridgeService) => {
    expect(service).toBeTruthy();
  }));
});
