import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { FilteredCatgoriesResponse } from '../../../interfaces/responses/filtered-catgories-response';
import { Category } from '../../../interfaces/category';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
      MatCardModule,
      CommonModule,
      MatButtonModule,
      DatePipe
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  // Properties
  protected pageSize: number = 10;
  protected pageNumber: number = 1;
  protected categories: Category[] = [];

  // Constructor
  constructor(private _financeTrackerApiService: FinanceTrackerApiService) {

  }

  // Event handlers
  ngOnInit() {
    // Fetch unapproved categories
    this.FetchUnapprovedCategories();
  }

  // Methods
  private FetchUnapprovedCategories() {
    let filter = {"status":"Pending"}

    // Fetch unapproved categories
    this._financeTrackerApiService.ReadAllCategories(this.pageSize, this.pageNumber, filter).subscribe((response:FilteredCatgoriesResponse) => {
      this.categories = response.categories;
    });
  }

  protected ApproveCategory(categoryId: string|undefined) {
    if (categoryId) {
      this._financeTrackerApiService.ApproveCategory(categoryId).subscribe(() => {
        console.log('Category approved');
        this.FetchUnapprovedCategories();
      });
    }
  }

  protected RejectCategory(categoryId: string|undefined) {
    if (categoryId) {
      this._financeTrackerApiService.DenyCategory(categoryId).subscribe(() => {
        console.log('Category rejected');
        this.FetchUnapprovedCategories();
      });
    }
  }
}
