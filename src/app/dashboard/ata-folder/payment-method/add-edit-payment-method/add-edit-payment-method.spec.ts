import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPaymentMethod } from './add-edit-payment-method';

describe('AddEditPaymentMethod', () => {
  let component: AddEditPaymentMethod;
  let fixture: ComponentFixture<AddEditPaymentMethod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPaymentMethod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPaymentMethod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
