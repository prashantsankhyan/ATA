import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaAgentAttachement } from './ata-agent-attachement';

describe('AtaAgentAttachement', () => {
  let component: AtaAgentAttachement;
  let fixture: ComponentFixture<AtaAgentAttachement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaAgentAttachement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaAgentAttachement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
