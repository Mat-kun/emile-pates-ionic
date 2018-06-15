import { TestBed, inject } from '@angular/core/testing';

import { FakeRecipeService } from './fake-recipe.service';

describe('FakeRecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeRecipeService]
    });
  });

  it('should be created', inject([FakeRecipeService], (service: FakeRecipeService) => {
    expect(service).toBeTruthy();
  }));
});
