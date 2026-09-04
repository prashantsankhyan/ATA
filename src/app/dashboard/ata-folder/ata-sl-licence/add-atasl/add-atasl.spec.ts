import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddATASL } from './add-atasl';

describe('AddATASL', () => {
  let component: AddATASL;
  let fixture: ComponentFixture<AddATASL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddATASL]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddATASL);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
