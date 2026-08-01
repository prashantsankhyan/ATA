import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrcPdf } from './crc-pdf';

describe('CrcPdf', () => {
  let component: CrcPdf;
  let fixture: ComponentFixture<CrcPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrcPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrcPdf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
