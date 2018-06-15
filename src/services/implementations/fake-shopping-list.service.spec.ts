import { TestBed, inject } from '@angular/core/testing';

import { FakeShoppingListService } from './fake-shopping-list.service';

describe('FakeShoppingListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeShoppingListService]
    });
  });

  it('should be created', inject([FakeShoppingListService], (service: FakeShoppingListService) => {
    expect(service).toBeTruthy();
  }));
});
