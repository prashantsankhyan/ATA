import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAgent } from './add-edit-agent';

describe('AddEditAgent', () => {
  let component: AddEditAgent;
  let fixture: ComponentFixture<AddEditAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAgent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
