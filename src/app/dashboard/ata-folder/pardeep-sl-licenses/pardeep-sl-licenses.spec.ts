import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PardeepSlLicenses } from './pardeep-sl-licenses';

describe('PardeepSlLicenses', () => {
  let component: PardeepSlLicenses;
  let fixture: ComponentFixture<PardeepSlLicenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PardeepSlLicenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PardeepSlLicenses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
