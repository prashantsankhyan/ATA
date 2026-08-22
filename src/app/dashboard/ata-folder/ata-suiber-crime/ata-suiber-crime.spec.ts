import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaSuiberCrime } from './ata-suiber-crime';

describe('AtaSuiberCrime', () => {
  let component: AtaSuiberCrime;
  let fixture: ComponentFixture<AtaSuiberCrime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaSuiberCrime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaSuiberCrime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
