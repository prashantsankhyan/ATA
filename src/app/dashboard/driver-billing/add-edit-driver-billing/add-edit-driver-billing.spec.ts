import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDriverBilling } from './add-edit-driver-billing';

describe('AddEditDriverBilling', () => {
  let component: AddEditDriverBilling;
  let fixture: ComponentFixture<AddEditDriverBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDriverBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDriverBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
