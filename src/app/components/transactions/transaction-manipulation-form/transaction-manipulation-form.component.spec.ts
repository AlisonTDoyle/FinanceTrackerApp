import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManipulationFormComponent } from './transaction-manipulation-form.component';

describe('TransactionManipulationFormComponent', () => {
  let component: TransactionManipulationFormComponent;
  let fixture: ComponentFixture<TransactionManipulationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionManipulationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionManipulationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
