import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCarrier } from './add-edit-carrier';

describe('AddEditCarrier', () => {
  let component: AddEditCarrier;
  let fixture: ComponentFixture<AddEditCarrier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCarrier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCarrier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
