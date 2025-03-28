import { TestBed } from '@angular/core/testing';

import { FinanceTrackerApiService } from './finance-tracker-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Transaction } from '../../interfaces/transaction';

describe('FinanceTrackerApiService', () => {
  let service: FinanceTrackerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    describe('FinanceTrackerApiService', () => {
      let service: FinanceTrackerApiService;
      let httpMock: HttpTestingController;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [FinanceTrackerApiService]
        });
        service = TestBed.inject(FinanceTrackerApiService);
        httpMock = TestBed.inject(HttpTestingController);
      });

      afterEach(() => {
        httpMock.verify();
      });

      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      it('should create a transaction', () => {
        const mockTransaction: Transaction = {
          _id: '1',
          price: 100,
          description: 'Test transaction',
          date: new Date(),
          name: "test",
          category: {
            user: "456",
            name: "category"
          },
          user: '456'
        };

        service.CreateTransaction(mockTransaction).subscribe((response) => {
          expect(response).toEqual(mockTransaction);
        });

        const req = httpMock.expectOne(service['_transactionUrl']);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockTransaction);
        req.flush(mockTransaction);
      });
    });
  });
});
