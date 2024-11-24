import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Budget } from '../../interfaces/budget';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { BudgetInfoComponent } from "../../components/budgets-dashboard/budget-info/budget-info.component";

@Component({
  selector: 'app-budgets-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    BudgetInfoComponent
],
  templateUrl: './budgets-dashboard.component.html',
  styleUrl: './budgets-dashboard.component.scss'
})
export class BudgetsDashboardComponent {
  // Properties
  readonly panelOpenState = signal(false);
  protected budgets:Budget[] = [];

  // Constructor
  constructor(private _financeTrackerApi:FinanceTrackerApiService) {
    _financeTrackerApi.ReadBudgets().subscribe(returnedBudgets => {
      console.log(returnedBudgets)
      this.budgets = returnedBudgets;
    })
  }

  // Event listeners

  // Methods
}
