import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentListAttachment } from './agent-list-attachment';

describe('AgentListAttachment', () => {
  let component: AgentListAttachment;
  let fixture: ComponentFixture<AgentListAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentListAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentListAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
