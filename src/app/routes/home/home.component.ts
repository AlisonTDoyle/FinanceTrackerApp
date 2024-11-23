import { Component, OnInit, HostListener } from '@angular/core';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { TransactionManipulationFormComponent } from '../../components/home/transaction-manipulation-form/transaction-manipulation-form.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { RecentTransactionsListComponent } from '../../components/home/recent-transactions-list/recent-transactions-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TransactionManipulationFormComponent,
    RecentTransactionsListComponent,
    MatGridListModule,
    MatSidenavModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Properties
  protected transactions: Transaction[] = [];
  protected columns:number = 2;
  protected rowHeight:number = 0;
  protected selectedTransaction:Transaction | null = null;

  // Constructors
  public constructor() {

  }

  // Event listeners
  ngOnInit(): void {
    this.GetSutibleColumnsForScreenSize(window.innerWidth);
    this.rowHeight = window.innerHeight - 200;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.GetSutibleColumnsForScreenSize(window.innerWidth);
  }

  // Methods
  private GetSutibleColumnsForScreenSize(screenWidth :number) {
    if (screenWidth < 800) {
      this.columns = 1
    } else {
      this.columns = 2
    }
  }

  protected UpdateSelectedTransaction(transaction:Transaction | null):void {
    this.selectedTransaction = transaction;
  }
}
