import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBor } from './list-of-bor';

describe('ListOfBor', () => {
  let component: ListOfBor;
  let fixture: ComponentFixture<ListOfBor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfBor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfBor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
