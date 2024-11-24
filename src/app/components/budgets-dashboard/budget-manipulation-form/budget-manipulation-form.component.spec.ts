import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetManipulationFormComponent } from './budget-manipulation-form.component';

describe('BudgetManipulationFormComponent', () => {
  let component: BudgetManipulationFormComponent;
  let fixture: ComponentFixture<BudgetManipulationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetManipulationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetManipulationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
