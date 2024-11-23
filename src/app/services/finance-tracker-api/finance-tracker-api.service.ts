import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Transaction } from '../../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class FinanceTrackerApiService {
  // Properties
  private _apiUrl: string = "http://localhost:3000/api/v1";
  private _transactionUrl: string = this._apiUrl + "/transaction";

  // Constructor
  constructor(private _httpClient: HttpClient) { }

  // Methods
  //#region transactions
  public CreateTransaction(newTransaction: Transaction): Observable<Transaction> {
    return this._httpClient.post<Transaction>(this._transactionUrl, newTransaction)
      .pipe(
        catchError(this.handleError)
      );
  }

  public ReadTransactions(): Observable<Transaction[]> {
    return this._httpClient.get<Transaction[]>(this._transactionUrl);
  }

  public UpdateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    let requestUri = `${this._transactionUrl}/${id}`
    return this._httpClient.put<Transaction>(requestUri, transaction)
      .pipe(
        catchError(this.handleError)
      )
  }

  public DeleteTransaction(id:number, transactionToDelete: Transaction): Observable<Transaction> {
    let uri = `${this._transactionUrl}/${id}`
    return this._httpClient.delete<Transaction>(uri)
      .pipe(
        catchError(this.handleError)
      )
  }
  //#endregion

  //#region budgets
  //#endregion

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Server Error ${error.status}: Body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
