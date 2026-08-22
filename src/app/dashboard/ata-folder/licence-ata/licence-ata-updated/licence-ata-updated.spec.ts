import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceAtaUpdated } from './licence-ata-updated';

describe('LicenceAtaUpdated', () => {
  let component: LicenceAtaUpdated;
  let fixture: ComponentFixture<LicenceAtaUpdated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenceAtaUpdated]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenceAtaUpdated);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
