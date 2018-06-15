import { TestBed, inject } from '@angular/core/testing';

import { FakePlanningService } from './fake-planning.service';

describe('FakePlanningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakePlanningService]
    });
  });

  it('should be created', inject([FakePlanningService], (service: FakePlanningService) => {
    expect(service).toBeTruthy();
  }));
});
