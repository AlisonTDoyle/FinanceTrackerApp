import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Transaction, TransactionType } from '../../../interfaces/transaction';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';

@Component({
  selector: 'app-recent-transactions-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recent-transactions-list.component.html',
  styleUrl: './recent-transactions-list.component.scss'
})
export class RecentTransactionsListComponent {
  // Properties
  
  // Inputs and outputs
  @Input() transactions:Transaction[] = []
  @Output() transactionManipulationEvent = new EventEmitter<Transaction | null>();
  @Output() transactionDeleteEvent = new EventEmitter<Transaction>();

  // Constructors
  constructor() {
  }

  // Event handler

  // Methods
  protected RecordNewTransaction() {
    this.transactionManipulationEvent.emit(null);
  }

  protected EditTransaction(transaction:Transaction) {
    this.transactionManipulationEvent.emit(transaction);
  }

  protected DeleteTransaction(transaction:Transaction) {
    this.transactionDeleteEvent.emit(transaction);
  }
}
