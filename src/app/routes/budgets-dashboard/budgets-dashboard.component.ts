import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Budget } from '../../interfaces/budget';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { BudgetInfoComponent } from "../../components/budgets-dashboard/budget-info/budget-info.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { BudgetManipulationFormComponent } from '../../components/budgets-dashboard/budget-manipulation-form/budget-manipulation-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-budgets-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    BudgetInfoComponent,
    MatSidenavModule,
    BudgetManipulationFormComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './budgets-dashboard.component.html',
  styleUrl: './budgets-dashboard.component.scss'
})
export class BudgetsDashboardComponent implements OnInit {
  // Properties
  readonly panelOpenState = signal(false);
  protected budgets: Budget[] = [];
  protected selectedBudget: Budget | null = null;

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService) {
  }

  // Event listeners
  ngOnInit(): void {
    this.FetchBudgets();
  }

  // Methods
  protected FetchBudgets(): void {
    this._financeTrackerApi.ReadBudgets().subscribe(returnedBudgets => {
      console.log(returnedBudgets)
      this.budgets = returnedBudgets;
    })
  }

  protected UpdateSelectedBudget(budget :Budget|null):void {
    this.selectedBudget = budget;
  }

  protected DeleteBudget(budget:Budget):void {
    this._financeTrackerApi.DeleteBudget(budget._id, budget).subscribe(() => {
      this.FetchBudgets();
    })
  }
}
