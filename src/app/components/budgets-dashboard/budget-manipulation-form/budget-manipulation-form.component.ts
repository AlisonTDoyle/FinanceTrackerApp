import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Budget } from '../../../interfaces/budget';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../../interfaces/category';
import { Categories } from '../../../enums/categories';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-budget-manipulation-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './budget-manipulation-form.component.html',
  styleUrl: './budget-manipulation-form.component.scss'
})
export class BudgetManipulationFormComponent {
  // Inputs and outputs
  @Input() budget: Budget | null = null;
  @Output() manipulationSubmitted = new EventEmitter();
  @Output() closeDrawer = new EventEmitter();

  // Properties
  protected categories: Category[] = []
  protected formTitle: string = "";
  protected submitButtonText: string = "";
  protected budgetForm: FormGroup = new FormGroup({});

  // Constructor
  constructor(private _formBuilder: FormBuilder, private _financeTrackerApi : FinanceTrackerApiService) {
    if (this.budget == null) {
      // Customise form elements
      this.formTitle = "New Budget";
      this.submitButtonText = "Create Budget";

      // Set up form fields
      this.budgetForm = _formBuilder.group({
        allocations: _formBuilder.array([]),
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
      });
    } else {
      // Customise form elements
      this.formTitle = "Edit Budget";
      this.submitButtonText = "Update Budget";

      // Set up form fields
      this.budgetForm = _formBuilder.group({
        allocations: _formBuilder.array([]),
        start_date: [''],
        end_date: [''],
      });
    }
  }

  // Event listeners
  protected OnSubmit():void {
    if (this.budget == null) {
      this.CreateBudget(this.budgetForm);
    }
  }

  // Methods
  protected AddAllocation(): void {
    let allocationFormGroup = this._formBuilder.group({
      category: ['', []],
      allocated_amount: ['', []]
    });

    this.allocations.push(allocationFormGroup);
  }

  private CreateBudget(form:FormGroup):void {
    let total:number = 0;
    for (let i = 0; i < form.value.allocations; i++) {
      total += form.value.allocations[i].allocated_amount;
    }

    let budget:Budget = {
      allocations: form.value.allocations,
      start_date: form.value.start_date,
      end_date: form.value.end_date,
      total: total
    }

    this._financeTrackerApi.CreateBudget(budget).subscribe(() => {
      this.manipulationSubmitted.emit();
    });
  }

  private UpdateBudget(form:FormGroup):void {

  }

  protected get allocations(): FormArray {
    return this.budgetForm.get('allocations') as FormArray;
  }

  get categoryKeys(): string[] {
    return Object.values(Categories); // Use Object.keys(UserRole) for numeric enums
  }
}
