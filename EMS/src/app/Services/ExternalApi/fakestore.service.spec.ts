import { TestBed } from '@angular/core/testing';

import { FakestoreService } from './fakestore.service';

describe('FakestoreService', () => {
  let service: FakestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
