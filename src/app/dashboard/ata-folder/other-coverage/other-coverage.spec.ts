import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCoverage } from './other-coverage';

describe('OtherCoverage', () => {
  let component: OtherCoverage;
  let fixture: ComponentFixture<OtherCoverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherCoverage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherCoverage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
