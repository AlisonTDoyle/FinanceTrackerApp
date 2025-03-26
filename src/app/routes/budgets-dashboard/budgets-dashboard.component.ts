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
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CurrentBudgetComponent } from '../../components/budgets-dashboard/current-budget/current-budget.component';

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
    DatePipe,
    MatCardModule,
    CurrentBudgetComponent
  ],
  templateUrl: './budgets-dashboard.component.html',
  styleUrl: './budgets-dashboard.component.scss'
})
export class BudgetsDashboardComponent implements OnInit {
  // Properties
  readonly panelOpenState = signal(false);
  protected budgets: Budget[] = [];
  protected selectedBudget: Budget | null = null;
  protected currentBudget: Budget | null = null;

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {
  }

  // Event listeners
  ngOnInit(): void {
    // Get the current user
    this._authService.GetCurrentUser().subscribe(res => {
      let userId = res.data.user?.id;

      // Get start and end date of the current month
      let date = new Date();
      let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
      let filter = {
        "start_date": startDate,
        "end_date": endDate
      }

      // Try to get the current budget
      this._financeTrackerApi.ReadBudgetsFiltered(userId, filter).subscribe(res => {
        console.log(res);

        // If there is a budget, set it as the current budget
        if (res.length > 0) {
          this.currentBudget = res[0];
        } else {
          // If there is no budget, create a new one
          let newBudget:Budget = {
            start_date: startDate,
            end_date: endDate,
            user: userId,
            allocations: []
          }
  
          this._financeTrackerApi.CreateBudget(newBudget).subscribe(res => {
            console.log("new budget created");
          })
        }
      })
  
      // Get all other budgets
      this.FetchBudgets();
    });
  }

  // Methods
  protected FetchBudgets(): void {
    // Get the current user
    this._authService.GetCurrentUser().subscribe(res => {

      // When user is fetched, get the budgets
    this._financeTrackerApi.ReadBudgetsFiltered(res.data.user?.id, {}).subscribe(returnedBudgets => {
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
