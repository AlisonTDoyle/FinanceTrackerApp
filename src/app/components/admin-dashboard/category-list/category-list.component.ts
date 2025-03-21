import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
      MatCardModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  // Properties

  // Constructor
  constructor() {

  }

  // Methods
}
