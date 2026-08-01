import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBilling } from './add-edit-billing';

describe('AddEditBilling', () => {
  let component: AddEditBilling;
  let fixture: ComponentFixture<AddEditBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
