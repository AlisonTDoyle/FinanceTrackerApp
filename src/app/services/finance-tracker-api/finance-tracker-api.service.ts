import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class FinanceTrackerApiService {
  // Properties
  private _apiUrl: string = "http://localhost:3000/api/v1";

  // Constructor
  constructor(private _httpClient:HttpClient) { }

  // Methods
  //#region transactions
  public CreateTransaction(): void {
    
  }

  public ReadTransactions():Observable<Transaction[]> {
    return this._httpClient.get<Transaction[]>(this._apiUrl + "/transaction");
  }

  public UpdateTransaction():void {

  }

  public DeleteTransaction():void {

  }
  //#endregion
}
