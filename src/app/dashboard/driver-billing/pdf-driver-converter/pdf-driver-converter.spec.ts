import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDriverConverter } from './pdf-driver-converter';

describe('PdfDriverConverter', () => {
  let component: PdfDriverConverter;
  let fixture: ComponentFixture<PdfDriverConverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfDriverConverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDriverConverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
