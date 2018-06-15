import { TestBed, inject } from '@angular/core/testing';

import { FridgeService } from './fridge.service';

describe('FridgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FridgeService]
    });
  });

  it('should be created', inject([FridgeService], (service: FridgeService) => {
    expect(service).toBeTruthy();
  }));
});
