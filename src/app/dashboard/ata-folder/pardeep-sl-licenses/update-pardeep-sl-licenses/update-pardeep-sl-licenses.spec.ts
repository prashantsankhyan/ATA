import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePardeepSlLicenses } from './update-pardeep-sl-licenses';

describe('UpdatePardeepSlLicenses', () => {
  let component: UpdatePardeepSlLicenses;
  let fixture: ComponentFixture<UpdatePardeepSlLicenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePardeepSlLicenses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePardeepSlLicenses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
