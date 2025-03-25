import { Component, Input, Output, EventEmitter, OnInit, HostListener, inject } from '@angular/core';
import { Transaction, TransactionType } from '../../../interfaces/transaction';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CategoryManagerComponent } from '../../shared/category-manager/category-manager.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recent-transactions-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './recent-transactions-list.component.html',
  styleUrl: './recent-transactions-list.component.scss'
})
export class RecentTransactionsListComponent implements OnInit{
  // Properties
  protected displayedColumns:string[] = []
  protected columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  protected currentPage:number = 0;
  protected dialog = inject(MatDialog)
  
  // Inputs and outputs
  @Input() transactions:Transaction[] = []
  @Input() totalDocs:number = 0;
  @Output() pageTurnEvent = new EventEmitter<PageEvent>();
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

  openDialog(): void {
    this.dialog.open(CategoryManagerComponent, {width: '120rem'});
  }

  // Methods
  protected RecordNewTransaction() {
    this.transactionManipulationEvent.emit(null);
  }

  protected EditTransaction(transaction:Transaction):void {
    this.transactionManipulationEvent.emit(transaction);
  }

  protected DeleteTransaction(transaction:Transaction):void {
    this.transactionDeleteEvent.emit(transaction);
  }

  protected HandlePageEvent(pageEvent: PageEvent):void {
    console.log(pageEvent);
    this.pageTurnEvent.emit(pageEvent);
  }

  private SelectColumnsToDisplay() {
    let windowWidth:number = window.innerWidth;

      if (windowWidth < 768) {
        this.displayedColumns = ['name', 'cost', 'date', 'action']
      } else if (windowWidth < 992) {
        this.displayedColumns = ['name', 'cost', 'date', 'category', 'action']
      } else {
        this.displayedColumns = ['name', 'cost', 'date', 'description', 'category', 'action']
      }
  }
}
