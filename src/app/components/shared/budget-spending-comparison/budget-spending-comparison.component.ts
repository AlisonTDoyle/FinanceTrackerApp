import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../../interfaces/transaction';
import { Budget } from '../../../interfaces/budget';
import { TransactionResponse } from '../../../interfaces/transaction-response';
import { UserResponse } from '@supabase/supabase-js';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-budget-spending-comparison',
  standalone: true,
  imports: [],
  templateUrl: './budget-spending-comparison.component.html',
  styleUrl: './budget-spending-comparison.component.scss'
})
export class BudgetSpendingComparisonComponent implements OnInit {
  // Properties
  private _userId: string | undefined = "";

  protected currentMonthTransactions: Transaction[] = []
  protected currentMonthBudget: Budget | null = null

  // Constructors
  constructor(private financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {

  }

  // Event handlers
  ngOnInit(): void {
    // Get user currently signed in
    this.GetCurrentUserId();

    // // Get necissary information
    // this.FetchTransactionsForCurrentMonth();
    // this.FetchBudgetForCurrentMonth();

    // // Start calculations based on passed data
    // this.CalculateSpendingPerCategory();
  }

  // Methods
  private GetCurrentUserId(): void {
    this._authService.GetCurrentUser().subscribe(res => {
      this._userId = res.data.user?.id
    });
  }

  protected FetchTransactionsForCurrentMonth(): void {
    console.log("In FetchTransactionsForCurrentMonth()");

    // set up request parameters
    let filter: object = {};
    let ascending: boolean | null = null;
    let pageSize: number | null = 100;
    let pageNo: number | null = 1;
    let userId: string = this._userId != undefined ? this._userId : "";

    // Set up filter
    let currentDate = new Date();
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    filter = {
      date: {
        $gte: firstDayOfMonth,
        $lt: lastDayOfMonth
      }
    }

    console.log(filter)

    // transaction request
    this.financeTrackerApi.ReadTransactionsFiltered(filter, ascending, pageSize, pageNo, userId).subscribe((res: TransactionResponse) => {
      this.currentMonthTransactions = res.transactions;

      console.log(this.currentMonthTransactions)
    });
  }

  private FetchBudgetForCurrentMonth(): void {
    console.log("In FetchBudgetForCurrentMonth()");
  }

  private CalculateSpendingPerCategory(): void {
    console.log("In CalculateSpendingPerCategory()");
  }
}
