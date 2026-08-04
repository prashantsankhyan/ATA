import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditW9 } from './add-edit-w9';

describe('AddEditW9', () => {
  let component: AddEditW9;
  let fixture: ComponentFixture<AddEditW9>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditW9]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditW9);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
