import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAgentAppointment } from './add-edit-agent-appointment';

describe('AddEditAgentAppointment', () => {
  let component: AddEditAgentAppointment;
  let fixture: ComponentFixture<AddEditAgentAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAgentAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAgentAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
