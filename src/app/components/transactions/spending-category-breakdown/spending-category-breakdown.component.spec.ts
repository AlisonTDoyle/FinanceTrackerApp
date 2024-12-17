import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingCategoryBreakdownComponent } from './spending-category-breakdown.component';

describe('SpendingCategoryBreakdownComponent', () => {
  let component: SpendingCategoryBreakdownComponent;
  let fixture: ComponentFixture<SpendingCategoryBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendingCategoryBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingCategoryBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
