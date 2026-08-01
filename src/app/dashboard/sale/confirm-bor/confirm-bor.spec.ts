import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBor } from './confirm-bor';

describe('ConfirmBor', () => {
  let component: ConfirmBor;
  let fixture: ComponentFixture<ConfirmBor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmBor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmBor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
