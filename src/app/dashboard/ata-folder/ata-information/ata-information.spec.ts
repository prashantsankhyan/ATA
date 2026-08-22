import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaInformation } from './ata-information';

describe('AtaInformation', () => {
  let component: AtaInformation;
  let fixture: ComponentFixture<AtaInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
