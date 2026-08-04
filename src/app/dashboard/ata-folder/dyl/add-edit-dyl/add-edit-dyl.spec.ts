import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDyl } from './add-edit-dyl';

describe('AddEditDyl', () => {
  let component: AddEditDyl;
  let fixture: ComponentFixture<AddEditDyl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDyl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDyl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
