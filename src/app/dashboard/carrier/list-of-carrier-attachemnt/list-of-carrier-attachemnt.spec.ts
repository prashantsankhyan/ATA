import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCarrierAttachemnt } from './list-of-carrier-attachemnt';

describe('ListOfCarrierAttachemnt', () => {
  let component: ListOfCarrierAttachemnt;
  let fixture: ComponentFixture<ListOfCarrierAttachemnt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfCarrierAttachemnt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCarrierAttachemnt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
