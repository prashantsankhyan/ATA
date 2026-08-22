import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaFolderAgent } from './ata-folder-agent';

describe('AtaFolderAgent', () => {
  let component: AtaFolderAgent;
  let fixture: ComponentFixture<AtaFolderAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaFolderAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaFolderAgent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
