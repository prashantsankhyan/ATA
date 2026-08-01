import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaFolder } from './ata-folder';

describe('AtaFolder', () => {
  let component: AtaFolder;
  let fixture: ComponentFixture<AtaFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaFolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
