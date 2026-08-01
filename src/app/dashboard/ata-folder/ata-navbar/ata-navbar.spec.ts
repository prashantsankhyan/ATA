import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaNavbar } from './ata-navbar';

describe('AtaNavbar', () => {
  let component: AtaNavbar;
  let fixture: ComponentFixture<AtaNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
