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
  private _transactionUrl :string = this._apiUrl + "/transaction";

  // Constructor
  constructor(private _httpClient:HttpClient) { }

  // Methods
  //#region transactions
  public CreateTransaction(): void {
    
  }

  public ReadTransactions():Observable<Transaction[]> {
    return this._httpClient.get<Transaction[]>(this._transactionUrl);
  }

  public UpdateTransaction():void {

  }

  public DeleteTransaction(transactionToDelete:Transaction, pageNumber: number, userId:string):void {
    // Format request url
    let requestUrl: string = this._transactionUrl + `${transactionToDelete.id}?`;
    requestUrl = pageNumber == null ? requestUrl : requestUrl + `page=${pageNumber}&`;
    requestUrl = userId == null ? requestUrl : requestUrl + `userId=${userId}&`

     this._httpClient.delete<Transaction>(this._transactionUrl + `/${transactionToDelete.id}`)
     .pipe(catchError(this.handleError));
  }
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
