import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { BudgetsDashboardComponent } from './routes/budgets-dashboard/budgets-dashboard.component';
import { TransactionsComponent } from './routes/transactions/transactions.component';
import { AuthComponent } from './routes/auth/auth.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "budgets",
        component: BudgetsDashboardComponent
    },
    {
        path: "transactions",
        component: TransactionsComponent
    },
    {
        path: "auth",
        component: AuthComponent
    }
];
