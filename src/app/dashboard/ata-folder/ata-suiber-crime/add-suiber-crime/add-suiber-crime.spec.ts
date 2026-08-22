import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuiberCrime } from './add-suiber-crime';

describe('AddSuiberCrime', () => {
  let component: AddSuiberCrime;
  let fixture: ComponentFixture<AddSuiberCrime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSuiberCrime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuiberCrime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
