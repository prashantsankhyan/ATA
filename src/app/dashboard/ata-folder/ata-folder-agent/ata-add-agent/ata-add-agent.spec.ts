import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaAddAgent } from './ata-add-agent';

describe('AtaAddAgent', () => {
  let component: AtaAddAgent;
  let fixture: ComponentFixture<AtaAddAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaAddAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtaAddAgent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
