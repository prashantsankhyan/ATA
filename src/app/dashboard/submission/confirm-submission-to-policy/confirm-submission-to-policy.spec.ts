import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSubmissionToPolicy } from './confirm-submission-to-policy';

describe('ConfirmSubmissionToPolicy', () => {
  let component: ConfirmSubmissionToPolicy;
  let fixture: ComponentFixture<ConfirmSubmissionToPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmSubmissionToPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSubmissionToPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
