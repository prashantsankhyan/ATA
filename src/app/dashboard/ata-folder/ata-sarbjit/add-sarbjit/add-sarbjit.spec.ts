import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSarbjit } from './add-sarbjit';

describe('AddSarbjit', () => {
  let component: AddSarbjit;
  let fixture: ComponentFixture<AddSarbjit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSarbjit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSarbjit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
