import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Budget } from '../../interfaces/budget';
import { FinanceTrackerApiService } from '../../services/finance-tracker-api/finance-tracker-api.service';
import { BudgetInfoComponent } from "../../components/budgets-dashboard/budget-info/budget-info.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { BudgetManipulationFormComponent } from '../../components/budgets-dashboard/budget-manipulation-form/budget-manipulation-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { BudgetSpendingComparisonComponent } from '../../components/shared/budget-spending-comparison/budget-spending-comparison.component';

@Component({
  selector: 'app-budgets-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    BudgetInfoComponent,
    MatSidenavModule,
    BudgetManipulationFormComponent,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    BudgetSpendingComparisonComponent
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
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {
  }

  // Event listeners
  ngOnInit(): void {
    this.FetchBudgets();
  }

  // Methods
  protected FetchBudgets(): void {
    // Get the current user
    this._authService.GetCurrentUser().subscribe(res => {

      // When user is fetched, get the budgets
    this._financeTrackerApi.ReadBudgetsFiltered(res.data.user?.id).subscribe(returnedBudgets => {
      this.budgets = returnedBudgets;
    })
    });
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
