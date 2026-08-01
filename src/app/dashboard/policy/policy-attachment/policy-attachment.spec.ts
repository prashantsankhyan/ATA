import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAttachment } from './policy-attachment';

describe('PolicyAttachment', () => {
  let component: PolicyAttachment;
  let fixture: ComponentFixture<PolicyAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
