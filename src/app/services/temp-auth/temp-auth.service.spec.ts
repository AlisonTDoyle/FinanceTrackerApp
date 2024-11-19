import { TestBed } from '@angular/core/testing';

import { TempAuthService } from './temp-auth.service';

describe('TempAuthService', () => {
  let service: TempAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
