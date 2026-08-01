import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Endo } from './endo';

describe('Endo', () => {
  let component: Endo;
  let fixture: ComponentFixture<Endo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Endo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Endo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
