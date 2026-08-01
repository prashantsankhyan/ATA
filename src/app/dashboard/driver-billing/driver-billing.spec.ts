import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBilling } from './driver-billing';

describe('DriverBilling', () => {
  let component: DriverBilling;
  let fixture: ComponentFixture<DriverBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
