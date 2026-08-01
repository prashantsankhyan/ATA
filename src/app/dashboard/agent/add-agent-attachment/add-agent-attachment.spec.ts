import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentAttachment } from './add-agent-attachment';

describe('AddAgentAttachment', () => {
  let component: AddAgentAttachment;
  let fixture: ComponentFixture<AddAgentAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAgentAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgentAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
