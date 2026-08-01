import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStuff } from './add-edit-stuff';

describe('AddEditStuff', () => {
  let component: AddEditStuff;
  let fixture: ComponentFixture<AddEditStuff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStuff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditStuff);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
