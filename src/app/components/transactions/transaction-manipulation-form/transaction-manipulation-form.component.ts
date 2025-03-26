import { Component, EventEmitter, Input, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Transaction } from '../../../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth/auth.service';
import { Category } from '../../../interfaces/category';

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
export class TransactionManipulationFormComponent implements OnInit {
  // Inputs and outputs
  @Input() existingTransaction: Transaction | null = null;
  @Output() manipulationSubmitted = new EventEmitter();
  @Output() closeDrawer = new EventEmitter();

  // Properties
  protected formTile: string = "";
  protected submitButtonText: string = "";
  protected catgories:Category[]=[];
  protected transactionForm: FormGroup = new FormGroup({});
  private _userId:string|undefined='';

  // Constructor
  constructor(private _financeTrackerApi: FinanceTrackerApiService, private _formBuilder: FormBuilder, private _authService: AuthService) {
    // Select appropriate form title
    if (this.existingTransaction == null) {
      this.formTile = "New Transaction";
      this.submitButtonText = "Create Transaction";

      // Set up form
      this.transactionForm = _formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(3)]],
        date: ["", [Validators.required]],
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
        price: [this.existingTransaction?.price, [Validators.min(0), Validators.required]],
        description: [this.existingTransaction?.description, [Validators.minLength(0), Validators.maxLength(150)]],
        category: [this.existingTransaction?.category,[Validators.required]]
      });
    }
  }

  // Event listeners
  ngOnInit():void {
    this._authService.GetCurrentUser().subscribe((user) => {
      this._userId = user?.data.user?.id;

      // Get categories
      if (this._userId) {
        this._financeTrackerApi.ReadUserCategories(this._userId).subscribe((categories) => {
          this.catgories = categories;
        });
      }
    });
  }

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
        price: this.existingTransaction.price,
        description: this.existingTransaction.description,
        category: this.existingTransaction.category,
        user: this._userId
      });
      // Update form metadata like title and button text
      this.formTile = "Edit Transaction";
      this.submitButtonText = "Update Transaction";
    }
  }

  // Methods
  protected CreateTransaction(form: FormGroup): void {
    let selectedCategory = this.catgories.find(cat => cat.name === form.value.category);
    let newTransaction: Transaction = {
      name: form.value.name,
      date: form.value.date,
      description: form.value.description,
      category: selectedCategory || undefined,
      price: form.value.price,
      user: this._userId
    };

    console.log(newTransaction)

    this._financeTrackerApi.CreateTransaction(newTransaction).subscribe(() => {
      this.transactionForm.reset();
      this.existingTransaction = null;
      this.manipulationSubmitted.emit();
    });
  }

  protected UpdateTransaction(form: FormGroup): void {
    let updatedTransaction: Transaction = {
      name: form.value.name,
      date: form.value.date,
      description: form.value.description,
      category: form.value.category,
      price: form.value.price,
      user: this._userId
    };

    this._financeTrackerApi.UpdateTransaction(this.existingTransaction?._id, updatedTransaction).subscribe(() => {
      this.transactionForm.reset();
      this.existingTransaction = null;
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
   
  get description() {
    return this.transactionForm.get('description');
  }

  get category() {
    return this.transactionForm.get('category');
  }

  get price() {
    return this.transactionForm.get('price');
  }
}
