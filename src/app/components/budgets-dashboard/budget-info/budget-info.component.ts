import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { Budget } from '../../../interfaces/budget';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-budget-info',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatButton
  ],
  templateUrl: './budget-info.component.html',
  styleUrl: './budget-info.component.scss'
})
export class BudgetInfoComponent {
  // Inputs and outputs
  @Input() budget:Budget | undefined;
  @Output() deleteBudgetEvent = new EventEmitter<Budget>();
  @Output() editBudgetEvent = new EventEmitter<Budget>();

  // Properties

  // Constructor
  constructor(private _financeTrackerApi:FinanceTrackerApiService) {
    // this.budget?.allocations.forEach(allocation => {
    //   _financeTrackerApi.ReadCategoryById(allocation.category).subscribe(category => {
    //     allocation.name = category.name
    //   });
    // });
  }

  // Event listeners

  // Methods
  protected DeleteBudget(budget:Budget | undefined) : void {
    this.deleteBudgetEvent.emit(budget);
  }

  protected EditBudget(budget:Budget | undefined) : void {
    this.editBudgetEvent.emit(budget);
  }
}
