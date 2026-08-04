import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLicence } from './add-edit-licence';

describe('AddEditLicence', () => {
  let component: AddEditLicence;
  let fixture: ComponentFixture<AddEditLicence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditLicence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLicence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
