import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiceBilling } from './new-invoice-billing';

describe('NewInvoiceBilling', () => {
  let component: NewInvoiceBilling;
  let fixture: ComponentFixture<NewInvoiceBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInvoiceBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInvoiceBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
