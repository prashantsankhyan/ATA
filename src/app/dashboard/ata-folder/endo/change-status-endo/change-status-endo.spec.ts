import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusEndo } from './change-status-endo';

describe('ChangeStatusEndo', () => {
  let component: ChangeStatusEndo;
  let fixture: ComponentFixture<ChangeStatusEndo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStatusEndo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStatusEndo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
