import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVehicle } from './add-edit-vehicle';

describe('AddEditVehicle', () => {
  let component: AddEditVehicle;
  let fixture: ComponentFixture<AddEditVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditVehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditVehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
