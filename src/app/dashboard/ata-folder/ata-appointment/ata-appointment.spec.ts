import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaAppointment } from './ata-appointment';

describe('AtaAppointment', () => {
  let component: AtaAppointment;
  let fixture: ComponentFixture<AtaAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
