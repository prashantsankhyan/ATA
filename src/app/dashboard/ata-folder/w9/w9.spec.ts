import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W9 } from './w9';

describe('W9', () => {
  let component: W9;
  let fixture: ComponentFixture<W9>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [W9]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W9);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
