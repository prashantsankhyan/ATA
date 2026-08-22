import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageUpdateSarb } from './stage-update-sarb';

describe('StageUpdateSarb', () => {
  let component: StageUpdateSarb;
  let fixture: ComponentFixture<StageUpdateSarb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageUpdateSarb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageUpdateSarb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
