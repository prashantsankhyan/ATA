import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPardeepSILicenses } from './add-pardeep-silicenses';

describe('AddPardeepSILicenses', () => {
  let component: AddPardeepSILicenses;
  let fixture: ComponentFixture<AddPardeepSILicenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPardeepSILicenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPardeepSILicenses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
