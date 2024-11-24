import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { TransactionManipulationFormComponent } from '../../components/home/transaction-manipulation-form/transaction-manipulation-form.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecentTransactionsListComponent } from '../../components/home/recent-transactions-list/recent-transactions-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SpendingOverMonthComponent } from '../../components/home/spending-over-month/spending-over-month.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TransactionManipulationFormComponent,
    RecentTransactionsListComponent,
    MatGridListModule,
    MatSidenavModule,
    SpendingOverMonthComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Properties
  protected transactions: Transaction[] = [];
  protected columns: number = 2;
  protected rowHeight: number = 0;
  protected selectedTransaction: Transaction | null = null;

  // Constructors
  public constructor(private _financeTrackerApi: FinanceTrackerApiService) {

  }

  // Event listeners
  ngOnInit(): void {
    this.FetchTransaction();
  }

  // Methods
  protected UpdateSelectedTransaction(transaction: Transaction | null): void {
    this.selectedTransaction = transaction;
  }

  protected DeleteTransaction(transaction: Transaction): void {
    this._financeTrackerApi.DeleteTransaction(transaction._id, transaction).subscribe(() => {
      this.FetchTransaction();
    });
  }

  protected FetchTransaction(): void {
    this._financeTrackerApi.ReadTransactions().subscribe(transactions => {
      this.transactions = transactions
    });
  }
}
