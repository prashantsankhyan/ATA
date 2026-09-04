import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaSlLicence } from './ata-sl-licence';

describe('AtaSlLicence', () => {
  let component: AtaSlLicence;
  let fixture: ComponentFixture<AtaSlLicence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaSlLicence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaSlLicence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
