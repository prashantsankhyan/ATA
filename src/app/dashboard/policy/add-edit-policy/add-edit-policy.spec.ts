import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPolicy } from './add-edit-policy';

describe('AddEditPolicy', () => {
  let component: AddEditPolicy;
  let fixture: ComponentFixture<AddEditPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
