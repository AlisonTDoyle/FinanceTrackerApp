import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { Transaction, TransactionType } from '../../../interfaces/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-manipulation-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './transaction-manipulation-form.component.html',
  styleUrl: './transaction-manipulation-form.component.scss'
})
export class TransactionManipulationFormComponent {
  // Inputs and outputs
  @Input() existingTransaction:Transaction | null= null;
  
  // Properties
  protected formTile:string = "";
  protected transactionTypes:string[] = [
    "Outgoing",
    "Incoming"
  ];
  // Constructor
  constructor() {
    if (this.existingTransaction == null) {
      this.formTile = "New Transaction"
    } else {
      this.formTile = "Edit Transaction"
    }
  }

  // Event listeners

  // Methods
  protected CreateTransaction():void {

  }

  protected UpdateTransaction():void {

  }
}
