import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAttachement } from './sale-attachement';

describe('SaleAttachement', () => {
  let component: SaleAttachement;
  let fixture: ComponentFixture<SaleAttachement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAttachement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleAttachement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
