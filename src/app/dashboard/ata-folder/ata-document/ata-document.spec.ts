import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaDocument } from './ata-document';

describe('AtaDocument', () => {
  let component: AtaDocument;
  let fixture: ComponentFixture<AtaDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaDocument]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
