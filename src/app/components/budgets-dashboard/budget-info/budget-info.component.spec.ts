import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetInfoComponent } from './budget-info.component';

describe('BudgetInfoComponent', () => {
  let component: BudgetInfoComponent;
  let fixture: ComponentFixture<BudgetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
