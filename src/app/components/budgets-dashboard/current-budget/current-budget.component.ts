import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Budget } from '../../../interfaces/budget';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Allocation } from '../../../interfaces/allocation';

@Component({
  selector: 'app-current-budget',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatTableModule,
    CurrencyPipe
  ],
  templateUrl: './current-budget.component.html',
  styleUrl: './current-budget.component.scss'
})
export class CurrentBudgetComponent implements OnInit, OnChanges {
  // Inputs and outputs
  @Input() currentBudget:Budget|null = null;

  // Properties
  protected budgetAllocations:Allocation[] = []
  protected displayedColumns:string[] = ['category', "allocated_amount"]

  // Constructors

  // Event handlers
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentBudget'] && !changes['currentBudget'].firstChange) {
      this.budgetAllocations = this.currentBudget?.allocations || [];
    }
  }

  // Methods

}
