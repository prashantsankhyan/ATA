import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDriverBalance } from './manage-driver-balance';

describe('ManageDriverBalance', () => {
  let component: ManageDriverBalance;
  let fixture: ComponentFixture<ManageDriverBalance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDriverBalance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDriverBalance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
