import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubmissionAttachment } from './add-submission-attachment';

describe('AddSubmissionAttachment', () => {
  let component: AddSubmissionAttachment;
  let fixture: ComponentFixture<AddSubmissionAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubmissionAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubmissionAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
