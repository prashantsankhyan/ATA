import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDriverBilling } from './list-of-driver-billing';

describe('ListOfDriverBilling', () => {
  let component: ListOfDriverBilling;
  let fixture: ComponentFixture<ListOfDriverBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfDriverBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfDriverBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
