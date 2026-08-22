import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaBond } from './ata-bond';

describe('AtaBond', () => {
  let component: AtaBond;
  let fixture: ComponentFixture<AtaBond>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaBond]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaBond);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
