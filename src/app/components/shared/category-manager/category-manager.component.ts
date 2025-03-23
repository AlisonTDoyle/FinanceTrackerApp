import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../interfaces/category';
import { CommonModule } from '@angular/common';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [
    MatCard,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    CommonModule
  ],
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.scss'
})
export class CategoryManagerComponent implements OnInit {
  // Properties
  protected categories:Category[] = [];

  private _userId: string = '';

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _authService: AuthService) {
  }

  // Event handlers
  ngOnInit(): void {
    // Get user id
    this._authService.GetCurrentUser().subscribe((user) => {
      this._userId = user.data.user?.id || '';

      this.FetchCategoriesForUser();
    });
  }

  // Methods
  private FetchCategoriesForUser() {
    this._financeTrackerApi.ReadUserCategories(this._userId).subscribe((res) => {
      this.categories = res;
    });
  }
}
