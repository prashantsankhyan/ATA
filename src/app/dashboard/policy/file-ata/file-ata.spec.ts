import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileATA } from './file-ata';

describe('FileATA', () => {
  let component: FileATA;
  let fixture: ComponentFixture<FileATA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileATA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileATA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
