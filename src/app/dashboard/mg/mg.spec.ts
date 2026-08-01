import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mg } from './mg';

describe('Mg', () => {
  let component: Mg;
  let fixture: ComponentFixture<Mg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
