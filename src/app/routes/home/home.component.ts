import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Properties
  protected transactions: Transaction[] = []

  // Constructors
  public constructor(private _financeTrackerApi:FinanceTrackerApiService) {
    
  }

  // Event listeners
  ngOnInit(): void {
    this._financeTrackerApi.ReadTransactions().subscribe(returnedTransactions => {
      this.transactions = returnedTransactions
    });
  }

  // Methods
}
