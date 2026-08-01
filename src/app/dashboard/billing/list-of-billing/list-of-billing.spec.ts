import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBilling } from './list-of-billing';

describe('ListOfBilling', () => {
  let component: ListOfBilling;
  let fixture: ComponentFixture<ListOfBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
