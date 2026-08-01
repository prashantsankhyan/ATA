import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtandPolicyInvoice } from './extand-policy-invoice';

describe('ExtandPolicyInvoice', () => {
  let component: ExtandPolicyInvoice;
  let fixture: ComponentFixture<ExtandPolicyInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtandPolicyInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtandPolicyInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
