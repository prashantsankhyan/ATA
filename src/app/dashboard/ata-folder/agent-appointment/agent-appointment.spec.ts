import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAppointment } from './agent-appointment';

describe('AgentAppointment', () => {
  let component: AgentAppointment;
  let fixture: ComponentFixture<AgentAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
