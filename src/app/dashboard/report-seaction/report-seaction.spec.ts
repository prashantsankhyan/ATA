import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSeaction } from './report-seaction';

describe('ReportSeaction', () => {
  let component: ReportSeaction;
  let fixture: ComponentFixture<ReportSeaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSeaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSeaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
