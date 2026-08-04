import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSurpul } from './add-edit-surpul';

describe('AddEditSurpul', () => {
  let component: AddEditSurpul;
  let fixture: ComponentFixture<AddEditSurpul>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSurpul]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSurpul);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
