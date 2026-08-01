import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRegistration } from './add-edit-registration';

describe('AddEditRegistration', () => {
  let component: AddEditRegistration;
  let fixture: ComponentFixture<AddEditRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
