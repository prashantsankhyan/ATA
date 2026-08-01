import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCarrierAttachment } from './add-edit-carrier-attachment';

describe('AddEditCarrierAttachment', () => {
  let component: AddEditCarrierAttachment;
  let fixture: ComponentFixture<AddEditCarrierAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCarrierAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCarrierAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
