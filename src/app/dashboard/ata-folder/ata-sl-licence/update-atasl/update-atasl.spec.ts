import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateATASL } from './update-atasl';

describe('UpdateATASL', () => {
  let component: UpdateATASL;
  let fixture: ComponentFixture<UpdateATASL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateATASL]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateATASL);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
