import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMg } from './add-edit-mg';

describe('AddEditMg', () => {
  let component: AddEditMg;
  let fixture: ComponentFixture<AddEditMg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
