import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { BudgetsDashboardComponent } from './routes/budgets-dashboard/budgets-dashboard.component';
import { TransactionsComponent } from './routes/transactions/transactions.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "budgets",
        component: BudgetsDashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: "transactions",
        component: TransactionsComponent,
        canActivate: [authGuard]
    },
    {
        path: "auth/login",
        component: LoginComponent
    },
    {
        path: "auth/signup",
        component: SignupComponent,
    }
];
