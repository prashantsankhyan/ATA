import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPardeep } from './add-edit-pardeep';

describe('AddEditPardeep', () => {
  let component: AddEditPardeep;
  let fixture: ComponentFixture<AddEditPardeep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPardeep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPardeep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
