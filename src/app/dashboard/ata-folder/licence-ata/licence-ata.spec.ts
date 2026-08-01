import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceAta } from './licence-ata';

describe('LicenceAta', () => {
  let component: LicenceAta;
  let fixture: ComponentFixture<LicenceAta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenceAta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenceAta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
