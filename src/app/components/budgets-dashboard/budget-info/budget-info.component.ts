import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { Budget } from '../../../interfaces/budget';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Allocation } from '../../../interfaces/allocation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-budget-info',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatButton,
    MatIconModule,
    MatExpansionModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './budget-info.component.html',
  styleUrl: './budget-info.component.scss'
})
export class BudgetInfoComponent implements OnInit {
  // Inputs and outputs
  @Input() budget: Budget | undefined;
  @Output() deleteBudgetEvent = new EventEmitter<Budget>();
  @Output() editBudgetEvent = new EventEmitter<Budget>();

  // Properties
  protected budgetTotal: number = 0;
  protected allocations:Allocation[] = [];
  protected displayedColumns:string[] = ['category', "allocated_amount"]

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService) {
  }

  // Event listeners
  ngOnInit(): void {
    if (this.budget?.allocations != undefined) {
      for (let i = 0; i < this.budget?.allocations.length; i++) {
        this.allocations.push(this.budget.allocations[i]);
        this.budgetTotal += this.budget.allocations[i].allocated_amount
      }
    }
  }

  // Methods
  protected DeleteBudget(budget: Budget | undefined): void {
    this.deleteBudgetEvent.emit(budget);
  }

  protected EditBudget(budget: Budget | undefined): void {
    this.editBudgetEvent.emit(budget);
  }
}
