import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOtherCoverage } from './add-edit-other-coverage';

describe('AddEditOtherCoverage', () => {
  let component: AddEditOtherCoverage;
  let fixture: ComponentFixture<AddEditOtherCoverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditOtherCoverage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOtherCoverage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
