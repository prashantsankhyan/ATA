import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubmission } from './delete-submission';

describe('DeleteSubmission', () => {
  let component: DeleteSubmission;
  let fixture: ComponentFixture<DeleteSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubmission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
