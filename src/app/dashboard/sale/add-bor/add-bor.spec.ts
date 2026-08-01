import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBor } from './add-bor';

describe('AddBor', () => {
  let component: AddBor;
  let fixture: ComponentFixture<AddBor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
