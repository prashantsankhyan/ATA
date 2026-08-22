import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtaDocument } from './add-ata-document';

describe('AddAtaDocument', () => {
  let component: AddAtaDocument;
  let fixture: ComponentFixture<AddAtaDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAtaDocument]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAtaDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
