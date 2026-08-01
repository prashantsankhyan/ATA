import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveragesOffered } from './coverages-offered';

describe('CoveragesOffered', () => {
  let component: CoveragesOffered;
  let fixture: ComponentFixture<CoveragesOffered>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoveragesOffered]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoveragesOffered);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
