import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePardeepStatus } from './update-pardeep-status';

describe('UpdatePardeepStatus', () => {
  let component: UpdatePardeepStatus;
  let fixture: ComponentFixture<UpdatePardeepStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePardeepStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePardeepStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
