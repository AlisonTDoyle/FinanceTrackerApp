import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { UserListComponent } from '../../components/admin-dashboard/user-list/user-list.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    UserListComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
