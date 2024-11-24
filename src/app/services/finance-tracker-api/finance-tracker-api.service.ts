import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Transaction } from '../../interfaces/transaction';
import { Category } from '../../interfaces/category';
import { Budget } from '../../interfaces/budget';

@Injectable({
  providedIn: 'root'
})
export class FinanceTrackerApiService {
  // Properties
  private _transactionUrl: string = "http://localhost:3000/api/v1/transaction";
  private _categoryUrl: string = "http://localhost:3000/api/v1/category";
  private _budgetUrl:string = "http://localhost:3000/api/v1/budget";

  // Constructor
  constructor(private _httpClient: HttpClient) { }

  // Methods
  //#region transactions
  public CreateTransaction(newTransaction: Transaction) {
    return this._httpClient.post<Transaction>(this._transactionUrl, newTransaction)
    .pipe(
      tap((data) => {
        // Debug message
        console.log('Data: ' + JSON.stringify(data))
      }),
      catchError(this.HandleError)
    );
  }

  public ReadTransactions() {
    return this._httpClient.get<Transaction[]>(this._transactionUrl);
  }

  public UpdateTransaction(id: string | undefined, transaction: Transaction) {
    let requestUri = `${this._transactionUrl}/${id}`
    return this._httpClient.put<Transaction>(requestUri, transaction)
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DeleteTransaction(id:string | undefined, transactionToDelete: Transaction) {
    return this._httpClient.delete<Transaction>(this._transactionUrl + `/${id}`)
      .pipe(
        catchError(this.HandleError)
      )
  }
  //#endregion

  //#region categories
  public CreateCategory(newCategory: Category) {
    return this._httpClient.post<Category>(this._categoryUrl, newCategory)
      .pipe(
        catchError(this.HandleError)
      );
  }

  public ReadCategories() {
    return this._httpClient.get<Category[]>(this._categoryUrl);
  }

  public ReadCategoryById(id:string) {
    return this._httpClient.get<Category>(this._categoryUrl + "/id");
  }

  public UpdateCategory(id: string, category: Category) {
    let requestUri = `${this._categoryUrl}/${id}`
    return this._httpClient.put<Transaction>(requestUri, category)
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DeleteCategory(id:string, categoryToDelete: Category) {
    let uri = `${this._categoryUrl}/${id}`
    return this._httpClient.delete<Category>(uri)
      .pipe(
        catchError(this.HandleError)
      )
  }
  //#endregion

  //#region budgets
  public CreateBudget(newBudget: Budget) {
    return this._httpClient.post<Budget>(this._budgetUrl, newBudget)
    .pipe(
      tap((data) => {
        // Debug message
        console.log('Data: ' + JSON.stringify(data))
      }),
      catchError(this.HandleError)
    );
  }

  public ReadBudgets() {
    return this._httpClient.get<Budget[]>(this._budgetUrl);
  }

  public UpdateBudget(id: string | undefined, budget: Budget) {
    let requestUri = `${this._budgetUrl}/${id}`
    return this._httpClient.put<Budget>(requestUri, budget)
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DeleteBudget(id:string | undefined, budgetToDelete: Budget) {
    let uri = `${this._budgetUrl}/${id}`
    return this._httpClient.delete<Budget>(uri)
      .pipe(
        catchError(this.HandleError)
      )
  }
  //#endregion

  private HandleError(err: HttpErrorResponse) {
    console.error('Error: ' + err.message);
    return err.message;
  }
}
