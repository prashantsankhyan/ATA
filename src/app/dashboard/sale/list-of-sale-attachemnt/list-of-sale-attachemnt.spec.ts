import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSaleAttachemnt } from './list-of-sale-attachemnt';

describe('ListOfSaleAttachemnt', () => {
  let component: ListOfSaleAttachemnt;
  let fixture: ComponentFixture<ListOfSaleAttachemnt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSaleAttachemnt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfSaleAttachemnt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
