import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dyl } from './dyl';

describe('Dyl', () => {
  let component: Dyl;
  let fixture: ComponentFixture<Dyl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dyl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dyl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
