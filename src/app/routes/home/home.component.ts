import { Component, OnInit } from '@angular/core';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule, 
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Properties
  protected transactions: Transaction[] = [];

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
  protected DeleteTransaction(transaction:Transaction):void {
    if (transaction != null) {
      console.log(transaction);
      this._financeTrackerApi.DeleteTransaction(transaction);
    }
  }
}
