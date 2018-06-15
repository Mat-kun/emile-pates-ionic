import { TestBed, inject } from '@angular/core/testing';

import { FakeIngredientService } from './fake-ingredient.service';

describe('FakeIngredientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeIngredientService]
    });
  });

  it('should be created', inject([FakeIngredientService], (service: FakeIngredientService) => {
    expect(service).toBeTruthy();
  }));
});
