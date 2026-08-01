import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubmission } from './add-edit-submission';

describe('AddEditSubmission', () => {
  let component: AddEditSubmission;
  let fixture: ComponentFixture<AddEditSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSubmission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
