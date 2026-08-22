import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaSarbjit } from './ata-sarbjit';

describe('AtaSarbjit', () => {
  let component: AtaSarbjit;
  let fixture: ComponentFixture<AtaSarbjit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaSarbjit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaSarbjit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
