import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsDashboardComponent } from './budgets-dashboard.component';

describe('BudgetsDashboardComponent', () => {
  let component: BudgetsDashboardComponent;
  let fixture: ComponentFixture<BudgetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
