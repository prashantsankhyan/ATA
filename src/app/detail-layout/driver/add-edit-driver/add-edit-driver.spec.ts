import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDriver } from './add-edit-driver';

describe('AddEditDriver', () => {
  let component: AddEditDriver;
  let fixture: ComponentFixture<AddEditDriver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDriver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDriver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
