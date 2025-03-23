import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { CategoryListComponent } from "../../components/admin-dashboard/category-list/category-list.component";
import { CategoryManagerComponent } from '../../components/shared/category-manager/category-manager.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoryListComponent,
    CategoryManagerComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
