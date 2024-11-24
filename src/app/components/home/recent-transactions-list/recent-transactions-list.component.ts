import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Transaction, TransactionType } from '../../../interfaces/transaction';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-transactions-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './recent-transactions-list.component.html',
  styleUrl: './recent-transactions-list.component.scss'
})
export class RecentTransactionsListComponent implements OnInit{
  // Properties
  protected displayedColumns:string[] = []
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  
  // Inputs and outputs
  @Input() transactions:Transaction[] = []
  @Output() transactionManipulationEvent = new EventEmitter<Transaction | null>();
  @Output() transactionDeleteEvent = new EventEmitter<Transaction>();

  // Constructors
  constructor() {
  }

  // Event handler
  ngOnInit(): void {
        this.SelectColumnsToDisplay();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.SelectColumnsToDisplay();
  }

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

  private SelectColumnsToDisplay() {
    let windowWidth:number = window.innerWidth;

      if (windowWidth < 768) {
        this.displayedColumns = ['name', 'cost', 'date']
      } else if (windowWidth < 992) {
        this.displayedColumns = ['name', 'cost', 'date', 'category']
      } else {
        this.displayedColumns = ['name', 'cost', 'date', 'description', 'category']
      }
  }
}
