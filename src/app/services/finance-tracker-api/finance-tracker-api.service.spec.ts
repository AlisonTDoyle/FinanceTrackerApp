import { TestBed } from '@angular/core/testing';

import { FinanceTrackerApiService } from './finance-tracker-api.service';

describe('FinanceTrackerApiService', () => {
  let service: FinanceTrackerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceTrackerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
