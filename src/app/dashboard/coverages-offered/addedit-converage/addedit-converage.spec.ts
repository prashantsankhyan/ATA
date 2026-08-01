import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditConverage } from './addedit-converage';

describe('AddeditConverage', () => {
  let component: AddeditConverage;
  let fixture: ComponentFixture<AddeditConverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditConverage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditConverage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
