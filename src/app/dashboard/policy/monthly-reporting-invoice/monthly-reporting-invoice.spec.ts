import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyReportingInvoice } from './monthly-reporting-invoice';

describe('MonthlyReportingInvoice', () => {
  let component: MonthlyReportingInvoice;
  let fixture: ComponentFixture<MonthlyReportingInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyReportingInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyReportingInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
