import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSubmissionATA } from './file-submission-ata';

describe('FileSubmissionATA', () => {
  let component: FileSubmissionATA;
  let fixture: ComponentFixture<FileSubmissionATA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSubmissionATA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSubmissionATA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
