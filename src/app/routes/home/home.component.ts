import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { TransactionManipulationFormComponent } from '../../components/home/transaction-manipulation-form/transaction-manipulation-form.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecentTransactionsListComponent } from '../../components/home/recent-transactions-list/recent-transactions-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SpendingOverMonthComponent } from '../../components/home/spending-over-month/spending-over-month.component';
import { MatCardModule } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { SpendingCategoryBreakdownComponent } from '../../components/home/spending-category-breakdown/spending-category-breakdown.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TransactionManipulationFormComponent,
    RecentTransactionsListComponent,
    MatGridListModule,
    MatSidenavModule,
    SpendingOverMonthComponent,
    MatCardModule,
    SpendingCategoryBreakdownComponent
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
  protected currentPage = 1;
  protected pageSize = 8;
  protected totalDocs =0;

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
    this._financeTrackerApi.ReadTransactionsFiltered({}, null, this.pageSize, this.currentPage).subscribe(res => {
      this.transactions = res.transactions
      this.totalDocs = res.totalDocs
    });
  }

  protected PageTurnEvent(pageEvent:PageEvent) :void {
    this.currentPage = pageEvent.pageIndex +1;
    this.pageSize = pageEvent.pageSize;

    this.FetchTransaction();
  }
}
