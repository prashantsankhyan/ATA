import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaFolderCarrier } from './ata-folder-carrier';

describe('AtaFolderCarrier', () => {
  let component: AtaFolderCarrier;
  let fixture: ComponentFixture<AtaFolderCarrier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaFolderCarrier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaFolderCarrier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
