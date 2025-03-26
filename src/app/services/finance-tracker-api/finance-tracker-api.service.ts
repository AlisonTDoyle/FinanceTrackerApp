import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Transaction } from '../../interfaces/transaction';
import { Budget } from '../../interfaces/budget';
import { TransactionResponse } from '../../interfaces/responses/transaction-response';
import { environment } from '../../../environments/environment';
import { Category } from '../../interfaces/category';
import { FilteredCatgoriesResponse } from '../../interfaces/responses/filtered-catgories-response';

@Injectable({
  providedIn: 'root'
})
export class FinanceTrackerApiService {
  // Properties
  private _transactionUrl: string = environment.API_URL + '/transaction';
  private _budgetUrl: string = environment.API_URL + '/budget';
  private _categoryUrl:string = environment.API_URL + '/category';

  // Constructor
  constructor(private _httpClient: HttpClient) { }

  // Methods
  //#region transactions
  public CreateTransaction(newTransaction: Transaction) {
    console.log('Creating transaction: ' + JSON.stringify(newTransaction));

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
    return this._httpClient.get<TransactionResponse>(this._transactionUrl).pipe(
      tap((data) => {
        return data.transactions
      })
    );
  }

  public ReadTransactionsFiltered(filter: any, ascending: boolean | null, pageSize: number | null, pageNo: number | null, userId: string | undefined) {
    let urlParameters = "?";

    if (ascending != null) {
      urlParameters += `asc=${ascending}&`;
    }

    if (pageSize != null) {
      urlParameters += `pageSize=${pageSize}&`;
    }

    if (pageNo != null) {
      urlParameters += `page=${pageNo}&`
    }

    if (userId != null) {
      urlParameters += `userId=${userId}&`
    }

    return this._httpClient.post<TransactionResponse>(this._transactionUrl + `/filtered${urlParameters}`, filter);
  }

  public UpdateTransaction(id: string | undefined, transaction: Transaction) {
    let requestUri = `${this._transactionUrl}/${id}`
    return this._httpClient.put<Transaction>(requestUri, transaction)
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DeleteTransaction(id: string | undefined, transactionToDelete: Transaction) {
    return this._httpClient.delete<Transaction>(this._transactionUrl + `/${id}`)
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

  public ReadBudgets(userId: string | undefined) {
    let urlParameters = "?";

    if (userId != null) {
      urlParameters += `userId=${userId}&`
    }

    return this._httpClient.get<Budget[]>(this._budgetUrl)
  }

  public ReadBudgetsFiltered(userId: string|undefined) {
    let urlParameters = "?";

    if (userId != null) {
      urlParameters += `userId=${userId}&`
    }
    
    return this._httpClient.post<Budget[]>(this._budgetUrl + `/filtered${urlParameters}`, {});
  }

  public UpdateBudget(id: string | undefined, budget: Budget) {
    let requestUri = `${this._budgetUrl}/${id}`
    return this._httpClient.put<Budget>(requestUri, budget)
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DeleteBudget(id: string | undefined, budgetToDelete: Budget) {
    let uri = `${this._budgetUrl}/${id}`
    return this._httpClient.delete<Budget>(uri)
      .pipe(
        catchError(this.HandleError)
      )
  }
  //#endregion

  //#region categories
  public CreateCategory(newCategory: any) {
    return this._httpClient.post<any>(this._categoryUrl, newCategory)
      .pipe(
        tap((data) => {
          // Debug message
          console.log('Data: ' + JSON.stringify(data))
        }),
        catchError(this.HandleError)
      );
  }

  public ReadUserCategories(userId:string) {
    let searchUrl = `${this._categoryUrl}/${userId}`;

    return this._httpClient.get<Category[]>(searchUrl)
  }

  public ReadAllCategories(pageSize:number, pageNo:number, filter:any) {
    let urlParameters = `${this._categoryUrl}/filtered?pageSize=${pageSize}&page=${pageNo}`;

    console.log(filter);

    return this._httpClient.post<FilteredCatgoriesResponse>(urlParameters, filter);
  }

  public ApproveCategory(categoryId:string) {
    let approveUrl = `${this._categoryUrl}/approve/${categoryId}`;

    return this._httpClient.put(approveUrl, {})
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DenyCategory(categoryId:string) {
    let denyUrl = `${this._categoryUrl}/deny/${categoryId}`;

    return this._httpClient.put(denyUrl, {})
      .pipe(
        catchError(this.HandleError)
      )
  }

  public DeleteCategory(categoryId:string) {
    let deleteUrl = `${this._categoryUrl}/${categoryId}`;

    return this._httpClient.delete(deleteUrl)
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
