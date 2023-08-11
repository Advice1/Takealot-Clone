import { TestBed } from '@angular/core/testing';

import { SeasionsService } from './seasions.service';

describe('SeasionsService', () => {
  let service: SeasionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
