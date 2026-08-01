import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolicyStage } from './add-policy-stage';

describe('AddPolicyStage', () => {
  let component: AddPolicyStage;
  let fixture: ComponentFixture<AddPolicyStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPolicyStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPolicyStage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
