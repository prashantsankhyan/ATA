import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admitted } from './admitted';

describe('Admitted', () => {
  let component: Admitted;
  let fixture: ComponentFixture<Admitted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admitted]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admitted);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
