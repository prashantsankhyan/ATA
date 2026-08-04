import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditATAAppoitment } from './add-edit-ataappoitment';

describe('AddEditATAAppoitment', () => {
  let component: AddEditATAAppoitment;
  let fixture: ComponentFixture<AddEditATAAppoitment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditATAAppoitment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditATAAppoitment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
