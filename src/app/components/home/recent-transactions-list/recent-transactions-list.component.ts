import { Component, Input } from '@angular/core';
import { Transaction } from '../../../interfaces/transaction';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recent-transactions-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './recent-transactions-list.component.html',
  styleUrl: './recent-transactions-list.component.scss'
})
export class RecentTransactionsListComponent {
  // Properties

  // Inputs and outputs
  @Input() transactions?:Transaction[];

  // Constructors
  constructor() {

  }
  
  // Event handler

  // Methods
}
