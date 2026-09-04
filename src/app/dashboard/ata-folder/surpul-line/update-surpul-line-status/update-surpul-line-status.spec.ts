import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSurpulLineStatus } from './update-surpul-line-status';

describe('UpdateSurpulLineStatus', () => {
  let component: UpdateSurpulLineStatus;
  let fixture: ComponentFixture<UpdateSurpulLineStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSurpulLineStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSurpulLineStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
