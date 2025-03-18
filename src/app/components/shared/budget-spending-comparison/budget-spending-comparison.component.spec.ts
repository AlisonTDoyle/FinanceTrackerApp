import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSpendingComparisonComponent } from './budget-spending-comparison.component';

describe('BudgetSpendingComparisonComponent', () => {
  let component: BudgetSpendingComparisonComponent;
  let fixture: ComponentFixture<BudgetSpendingComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSpendingComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSpendingComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
