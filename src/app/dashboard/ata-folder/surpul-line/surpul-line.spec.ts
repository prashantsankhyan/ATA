import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurpulLine } from './surpul-line';

describe('SurpulLine', () => {
  let component: SurpulLine;
  let fixture: ComponentFixture<SurpulLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurpulLine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurpulLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
