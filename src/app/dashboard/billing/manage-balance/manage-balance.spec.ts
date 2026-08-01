import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBalance } from './manage-balance';

describe('ManageBalance', () => {
  let component: ManageBalance;
  let fixture: ComponentFixture<ManageBalance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBalance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBalance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
