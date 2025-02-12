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
        component: HomeComponent,
        title:"Home"
    },
    {
        path: "budgets",
        component: BudgetsDashboardComponent,
        canActivate: [authGuard],
        title:"Budgets"
    },
    {
        path: "transactions",
        component: TransactionsComponent,
        canActivate: [authGuard],
        title:"Transactions"
    },
    {
        path: "auth/login",
        component: LoginComponent,
        title:"Sign In"
    },
    {
        path: "auth/signup",
        component: SignupComponent,
        title:"Sign Up"
    }
];
