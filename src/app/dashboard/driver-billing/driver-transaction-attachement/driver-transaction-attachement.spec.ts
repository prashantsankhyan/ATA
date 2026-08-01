import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTransactionAttachement } from './driver-transaction-attachement';

describe('DriverTransactionAttachement', () => {
  let component: DriverTransactionAttachement;
  let fixture: ComponentFixture<DriverTransactionAttachement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverTransactionAttachement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTransactionAttachement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
