import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntryByTransactionId } from './delete-entry-by-transaction-id';

describe('DeleteEntryByTransactionId', () => {
  let component: DeleteEntryByTransactionId;
  let fixture: ComponentFixture<DeleteEntryByTransactionId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteEntryByTransactionId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEntryByTransactionId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
