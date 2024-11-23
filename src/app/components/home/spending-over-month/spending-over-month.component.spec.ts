import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingOverMonthComponent } from './spending-over-month.component';

describe('SpendingOverMonthComponent', () => {
  let component: SpendingOverMonthComponent;
  let fixture: ComponentFixture<SpendingOverMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendingOverMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingOverMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
