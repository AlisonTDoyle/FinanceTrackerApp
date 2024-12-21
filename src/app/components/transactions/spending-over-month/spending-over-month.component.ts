import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../../interfaces/transaction';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-spending-over-month',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './spending-over-month.component.html',
  styleUrl: './spending-over-month.component.scss'
})

export class SpendingOverMonthComponent implements OnInit {
  // Properties
  private _userId: string|undefined = "";

  // Inputs and outputs
  protected transactions: Transaction[] = []

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {
  }

  // Event listeners
  ngOnInit(): void {
    Chart.register(...registerables);

    this._authService.GetCurrentUser().subscribe(res => {
      this._userId = res.data.user?.id;
    });
    
    let filter = {
      date: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 28))
      }
    }

    this._financeTrackerApi.ReadTransactionsFiltered(filter, true, null, null, this._userId).subscribe((res) => {
      this.transactions = res.transactions;
      this.CreateChart()
    })
  }

  // Methods
  protected CreateChart() {
    let chartLabels: string[] = [];
    let chartData: number[] = [];

    this.transactions.forEach(transaction => {
      // Create chart labels      
      let date = new Date(transaction.date);
      let formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short'
      }).format(date);
      chartLabels.push(formattedDate)

      // Create chart data
      chartData.push(transaction.price);
    });

    console.log(chartLabels);

    new Chart("recentTransactionsChart", {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Money (€) Spent over Previous 28 days',
          data: chartData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
