import { Component, EventEmitter, Input, output, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Transaction } from '../../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { Category } from '../../../interfaces/category';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Categories } from '../../../enums/categories';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction-manipulation-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './transaction-manipulation-form.component.html',
  styleUrl: './transaction-manipulation-form.component.scss'
})
export class TransactionManipulationFormComponent {
  // Inputs and outputs
  @Input() existingTransaction: Transaction | null = null;
  @Output() manipulationSubmitted = new EventEmitter();
  @Output() closeDrawer = new EventEmitter();

  // Properties
  protected categories: Category[] = []
  protected formTile: string = "";
  protected submitButtonText: string = "";
  protected catgories = Categories;
  protected transactionTypes: string[] = [
    "Outgoing",
    "Incoming"
  ];
  protected transactionForm: FormGroup = new FormGroup({});

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _formBuilder: FormBuilder) {
    // Select appropriate form title
    if (this.existingTransaction == null) {
      this.formTile = "New Transaction";
      this.submitButtonText = "Create Transaction";

      // Set up form
      this.transactionForm = _formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(3)]],
        date: ["", [Validators.required]],
        type: ["", [Validators.minLength(2), Validators.required]],
        price: ["", [Validators.min(0), Validators.required]],
        description: ["", [Validators.minLength(0), Validators.maxLength(150)]],
        category: ["", [Validators.required]]
      });
    } else {
      this.formTile = "Edit Transaction";
      this.submitButtonText = "Update Transaction";

      // Set up form
      this.transactionForm = _formBuilder.group({
        name: [this.existingTransaction?.name, [Validators.required, Validators.minLength(3)]],
        date: [this.existingTransaction?.date, [Validators.required]],
        type: [this.existingTransaction?.type, [Validators.minLength(2), Validators.required]],
        price: [this.existingTransaction?.price, [Validators.min(0), Validators.required]],
        description: [this.existingTransaction?.description, [Validators.minLength(0), Validators.maxLength(150)]],
        category: [this.existingTransaction?.category,[Validators.required]]
      });
    }
  }

  // Event listeners
  onSubmit() {
    if (this.existingTransaction == null) {
      this.CreateTransaction(this.transactionForm);
    } else {
      this.UpdateTransaction(this.transactionForm);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['existingTransaction'] && this.existingTransaction) {
      // Update form values when the input changes
      this.transactionForm.patchValue({
        name: this.existingTransaction.name,
        date: this.existingTransaction.date,
        type: this.existingTransaction.type,
        price: this.existingTransaction.price,
        description: this.existingTransaction.description,
        category: this.existingTransaction.category
      });
      // Update form metadata like title and button text
      this.formTile = "Edit Transaction";
      this.submitButtonText = "Update Transaction";
    }
  }

  // Methods
  protected CreateTransaction(form: FormGroup): void {
    let newTransaction: Transaction = {
      name: form.value.name,
      date: form.value.date,
      type: form.value.type,
      description: form.value.description,
      category: form.value.category,
      price: form.value.price
    };

    this._financeTrackerApi.CreateTransaction(newTransaction).subscribe(() => {
      this.manipulationSubmitted.emit();
    });
  }

  protected UpdateTransaction(form: FormGroup): void {
    let updatedTransaction: Transaction = {
      name: form.value.name,
      date: form.value.date,
      type: form.value.type,
      description: form.value.description,
      category: form.value.category,
      price: form.value.price
    };

    console.table(updatedTransaction)

    this._financeTrackerApi.UpdateTransaction(this.existingTransaction?._id, updatedTransaction).subscribe(() => {
      this.manipulationSubmitted.emit();
    });
  }

  // Form feilds
  get name() {
    return this.transactionForm.get('name');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  get type() {
    return this.transactionForm.get('type');
  }

  get description() {
    return this.transactionForm.get('description');
  }

  get category() {
    return this.transactionForm.get('category');
  }

  get price() {
    return this.transactionForm.get('price');
  }

  get categoryKeys(): string[] {
    return Object.values(Categories); // Use Object.keys(UserRole) for numeric enums
  }
}
