import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaUnderCarrierInsurnce } from './ata-under-carrier-insurnce';

describe('AtaUnderCarrierInsurnce', () => {
  let component: AtaUnderCarrierInsurnce;
  let fixture: ComponentFixture<AtaUnderCarrierInsurnce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaUnderCarrierInsurnce]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaUnderCarrierInsurnce);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
