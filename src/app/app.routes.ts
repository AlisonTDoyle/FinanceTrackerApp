import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { BudgetsDashboardComponent } from './routes/budgets-dashboard/budgets-dashboard.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "budgets",
        component: BudgetsDashboardComponent
    }
];
