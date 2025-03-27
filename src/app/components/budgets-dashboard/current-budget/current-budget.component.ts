import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Budget } from '../../../interfaces/budget';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Allocation } from '../../../interfaces/allocation';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-current-budget',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatTableModule,
    CurrencyPipe,
    MatIcon
  ],
  templateUrl: './current-budget.component.html',
  styleUrl: './current-budget.component.scss'
})
export class CurrentBudgetComponent implements OnInit, OnChanges {
  // Inputs and outputs
  @Input() currentBudget: Budget | null = null;

  // Properties
  protected budgetAllocations: Allocation[] = []
  protected displayedColumns: string[] = ['category', "allocated_amount"]
  protected actualSpendingPerCategory: number[] = [];

  // Constructors
  constructor(private _financeTrackerApi: FinanceTrackerApiService) {

  }

  // Event handlers
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentBudget'] && !changes['currentBudget'].firstChange) {
      this.budgetAllocations = this.currentBudget?.allocations || [];

      // Calculate current expenditure
      this.CalculateSpendingInEachCategory();
    }
  }

  // Methods
  private CalculateSpendingInEachCategory() {
    // Get spending within the last month
    let filter =
    {
      "date": {
        "$gte": this.currentBudget?.start_date
      }
    }

    this._financeTrackerApi.ReadTransactionsFiltered(filter, null, 100, 1, this.currentBudget?.user).subscribe((res) => {
      let transactions = res.transactions;

      // Initialize spending per category
      const spendingMap: { [category: string]: number } = {};

      // Calculate spending for each transaction
      transactions.forEach(transaction => {
        const category = transaction.category?.name;
        const amount = transaction.price;

        if (category) {
          spendingMap[category] = (spendingMap[category] || 0) + amount;
        }
      });

      // Map spending to the budget categories
      this.actualSpendingPerCategory = this.budgetAllocations.map(allocation => 
        spendingMap[allocation.category.name] || 0
      );
    });
  }
}
