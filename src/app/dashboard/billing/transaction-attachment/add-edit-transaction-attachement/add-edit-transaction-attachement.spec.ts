import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTransactionAttachement } from './add-edit-transaction-attachement';

describe('AddEditTransactionAttachement', () => {
  let component: AddEditTransactionAttachement;
  let fixture: ComponentFixture<AddEditTransactionAttachement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTransactionAttachement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTransactionAttachement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
