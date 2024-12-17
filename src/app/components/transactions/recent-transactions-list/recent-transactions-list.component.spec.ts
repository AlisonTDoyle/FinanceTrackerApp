import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransactionsListComponent } from './recent-transactions-list.component';

describe('RecentTransactionsListComponent', () => {
  let component: RecentTransactionsListComponent;
  let fixture: ComponentFixture<RecentTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTransactionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
