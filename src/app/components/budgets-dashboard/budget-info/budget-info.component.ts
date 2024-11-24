import { Component, Input } from '@angular/core';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { Budget } from '../../../interfaces/budget';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-budget-info',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './budget-info.component.html',
  styleUrl: './budget-info.component.scss'
})
export class BudgetInfoComponent {
  // Inputs and outputs
  @Input() budget:Budget | null = null;

  // Properties
  dataSource = this.budget?.allocations;

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
}
