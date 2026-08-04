import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAtATax } from './add-edit-at-atax';

describe('AddEditAtATax', () => {
  let component: AddEditAtATax;
  let fixture: ComponentFixture<AddEditAtATax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAtATax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAtATax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
