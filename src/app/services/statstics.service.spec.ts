import { TestBed } from '@angular/core/testing';

import { StatsticsService } from './statstics.service';

describe('StatsticsService', () => {
  let service: StatsticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
