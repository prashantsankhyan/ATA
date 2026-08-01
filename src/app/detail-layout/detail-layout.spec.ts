import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLayout } from './detail-layout';

describe('DetailLayout', () => {
  let component: DetailLayout;
  let fixture: ComponentFixture<DetailLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
