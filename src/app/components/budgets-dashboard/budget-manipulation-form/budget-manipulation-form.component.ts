import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Budget } from '../../../interfaces/budget';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Categories } from '../../../enums/categories';
import { FinanceTrackerApiService } from '../../../services/finance-tracker-api/finance-tracker-api.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Allocation } from '../../../interfaces/allocation';

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
  protected formTitle: string = "";
  protected submitButtonText: string = "";
  protected budgetForm: FormGroup = new FormGroup({});

  // Constructor
  constructor(private _formBuilder: FormBuilder, private _financeTrackerApi: FinanceTrackerApiService) {
  }

  // Event listeners
  protected OnSubmit(): void {
    if (this.budget == null) {
      this.CreateBudget(this.budgetForm);
    } else {
      this.UpdateBudget(this.budgetForm);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.budget == null) {
      // Customise form elements
      this.formTitle = "New Budget";
      this.submitButtonText = "Create Budget";

      // Set up form fields
      this.budgetForm = this._formBuilder.group({
        allocations: this._formBuilder.array([]),
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
      });
    } else {
      // Update form metadata like title and button text
      this.formTitle = "Edit Budget";
      this.submitButtonText = "Update Budget";

      // Update start and end date fields
      this.budgetForm.patchValue({
        start_date: this.budget.start_date,
        end_date: this.budget.end_date
      });

      // Reset allocations forms
      this.budgetForm.setControl('allocations', this._formBuilder.array([]));

      // Create allocation for for each allocation
      this.budget.allocations.forEach(allocation => {
        this.allocations.push(this._formBuilder.group({
          category: [allocation.category, Validators.required],
          allocated_amount: [allocation.allocated_amount, [Validators.required, Validators.min(0)]]
        }));
      });
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

  private CreateBudget(form: FormGroup): void {
    let budget: Budget = {
      allocations: form.value.allocations,
      start_date: form.value.start_date,
      end_date: form.value.end_date
    }

    this._financeTrackerApi.CreateBudget(budget).subscribe(() => {
      this.manipulationSubmitted.emit();
    });
  }

  private UpdateBudget(form: FormGroup): void {
    let budget: Budget = {
      allocations: form.value.allocations,
      start_date: form.value.start_date,
      end_date: form.value.end_date
    }

    this._financeTrackerApi.UpdateBudget(this.budget?._id, budget).subscribe(() => {
      this.manipulationSubmitted.emit();
    });
  }

  protected RemoveAllocation(i:number): void {
    console.log('Removing index:', i);
    console.table(this.allocations.at(i))
    this.allocations.removeAt(i);
  }

  // Form fields
  get start_date() {
    return this.budgetForm.get('start_date');
  }

  get end_date() {
    return this.budgetForm.get('end_date');
  }

  protected get allocations(): FormArray {
    return this.budgetForm.get('allocations') as FormArray;
  }

  get categoryKeys(): string[] {
    return Object.values(Categories); // Use Object.keys(UserRole) for numeric enums
  }
}
