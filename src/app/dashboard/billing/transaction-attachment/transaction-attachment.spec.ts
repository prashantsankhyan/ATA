import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAttachment } from './transaction-attachment';

describe('TransactionAttachment', () => {
  let component: TransactionAttachment;
  let fixture: ComponentFixture<TransactionAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
