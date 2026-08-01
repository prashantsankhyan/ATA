import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDriverTransactionAttachment } from './list-of-driver-transaction-attachment';

describe('ListOfDriverTransactionAttachment', () => {
  let component: ListOfDriverTransactionAttachment;
  let fixture: ComponentFixture<ListOfDriverTransactionAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfDriverTransactionAttachment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfDriverTransactionAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
