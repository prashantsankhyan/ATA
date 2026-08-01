import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConverter } from './pdf-converter';

describe('PdfConverter', () => {
  let component: PdfConverter;
  let fixture: ComponentFixture<PdfConverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfConverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfConverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
