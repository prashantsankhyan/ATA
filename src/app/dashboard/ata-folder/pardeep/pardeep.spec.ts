import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pardeep } from './pardeep';

describe('Pardeep', () => {
  let component: Pardeep;
  let fixture: ComponentFixture<Pardeep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pardeep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pardeep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
