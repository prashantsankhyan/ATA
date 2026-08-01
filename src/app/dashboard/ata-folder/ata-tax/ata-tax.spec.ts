import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaTax } from './ata-tax';

describe('AtaTax', () => {
  let component: AtaTax;
  let fixture: ComponentFixture<AtaTax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaTax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaTax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
