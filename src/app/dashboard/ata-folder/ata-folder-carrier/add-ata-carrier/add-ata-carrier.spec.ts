import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtaCarrier } from './add-ata-carrier';

describe('AddAtaCarrier', () => {
  let component: AddAtaCarrier;
  let fixture: ComponentFixture<AddAtaCarrier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAtaCarrier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAtaCarrier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
