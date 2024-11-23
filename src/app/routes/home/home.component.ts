import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { TransactionManipulationFormComponent } from '../../components/home/transaction-manipulation-form/transaction-manipulation-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TransactionManipulationFormComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Properties
  protected transactions: Transaction[] = [];

  // Constructors
  public constructor(private _financeTrackerApi: FinanceTrackerApiService) {

  }

  // Event listeners
  ngOnInit(): void {
    this._financeTrackerApi.ReadTransactions().subscribe(returnedTransactions => {
      this.transactions = returnedTransactions
    });
  }

  // Methods
}
