import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service.js';
import { Categories } from '../../../enums/categories.js';
import { AuthService } from '../../../services/auth/auth.service.js';

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
  protected catgories = Categories;
  private _userId: string | undefined = "";

  // Inputs and outputs
  protected categoryPopulation: number[] = []

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {
    // Creating an object in array for each category
    for (let i = 0; i < this.categoryKeys.length; i++) {
      this.categoryPopulation.push(0)
    }
  }

  // Event listeners
  ngOnInit(): void {
    this._authService.GetCurrentUser().subscribe(res => {
      this._userId = res.data.user?.id;

      Chart.register(...registerables);
  
      // Create filter for returned data
      let filter = {
        date: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 28))
        }
      }
  
      // this._financeTrackerApi.ReadTransactionsFiltered(filter, null, null, null, this._userId).subscribe((res) => {
      //   res.transactions.forEach(transaction => {
      //     switch (transaction.category) {
      //       case "Housing":
      //         this.categoryPopulation[0]++
      //         break;
      //       case "Transportation":
      //         this.categoryPopulation[1]++
      //         break;
      //       case "Food":
      //         this.categoryPopulation[2]++
      //         break;
      //       case "Health & Wellness":
      //         this.categoryPopulation[3]++
      //         break;
      //       case "Entertainment & Recreation":
      //         this.categoryPopulation[4]++
      //         break;
      //       case "Misc":
      //         this.categoryPopulation[5]++
      //         break;
      //     }
      //   });
      //   this.CreateChart()
      // })
    });
  }

  // Methods
  protected CreateChart() {
    new Chart("spendingCategoryBreakdown", {
      type: 'pie',
      data: {
        labels: this.categoryKeys,
        datasets: [{
          label: 'Category',
          data: this.categoryPopulation,
        }]
      },
    });
  }

  get categoryKeys(): string[] {
    return Object.values(Categories); // Use Object.keys(UserRole) for numeric enums
  }
}
