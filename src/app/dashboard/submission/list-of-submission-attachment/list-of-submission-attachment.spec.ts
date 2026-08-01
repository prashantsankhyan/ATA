import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSubmissionAttachment } from './list-of-submission-attachment';

describe('ListOfSubmissionAttachment', () => {
  let component: ListOfSubmissionAttachment;
  let fixture: ComponentFixture<ListOfSubmissionAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSubmissionAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfSubmissionAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
