import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEndo } from './add-edit-endo';

describe('AddEditEndo', () => {
  let component: AddEditEndo;
  let fixture: ComponentFixture<AddEditEndo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEndo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEndo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
