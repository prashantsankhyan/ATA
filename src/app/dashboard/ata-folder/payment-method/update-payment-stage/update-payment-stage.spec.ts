import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentStage } from './update-payment-stage';

describe('UpdatePaymentStage', () => {
  let component: UpdatePaymentStage;
  let fixture: ComponentFixture<UpdatePaymentStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePaymentStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePaymentStage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
