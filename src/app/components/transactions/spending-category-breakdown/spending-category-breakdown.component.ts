import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service.js';
import { AuthService } from '../../../services/auth/auth.service.js';
import { Category } from '../../../interfaces/category.js';

@Component({
  selector: 'app-spending-category-breakdown',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './spending-category-breakdown.component.html',
  styleUrl: './spending-category-breakdown.component.scss'
})
export class SpendingCategoryBreakdownComponent implements OnInit {

  // Properties
  protected catgories: Category[] = [];
  protected categoryNames: string[] = [];
  private _userId: string | undefined = "";

  // Inputs and outputs
  protected categoryPopulation: number[] = []

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {
  }

  // Event listeners
  ngOnInit(): void {
    this._authService.GetCurrentUser().subscribe(res => {
      this._userId = res.data.user?.id;

      if (this._userId) {
        this._financeTrackerApi.ReadUserCategories(this._userId).subscribe((res) => {
          this.catgories = res;

          this.catgories.forEach(category => {
            this.categoryNames.push(category.name);
            this.categoryPopulation.push(0);
          });

          Chart.register(...registerables);

          // Create filter for returned data
          let filter = {
            date: {
              $gte: new Date(new Date().setDate(new Date().getDate() - 28))
            }
          }

          this._financeTrackerApi.ReadTransactionsFiltered(filter, null, null, null, this._userId).subscribe((res) => {

            res.transactions.forEach(transaction => {
              const categoryIndex = this.catgories.findIndex(category => category.name === transaction.category?.name);
              if (categoryIndex !== -1) {
                this.categoryPopulation[categoryIndex]++;
              }
            });

            this.CreateChart()
          })
        });
      }
    });
  }

  // Methods
  protected CreateChart() {
    new Chart("spendingCategoryBreakdown", {
      type: 'pie',
      data: {
        labels: this.categoryNames,
        datasets: [{
          label: 'Category',
          data: this.categoryPopulation,
        }]
      },
    });
  }
}
