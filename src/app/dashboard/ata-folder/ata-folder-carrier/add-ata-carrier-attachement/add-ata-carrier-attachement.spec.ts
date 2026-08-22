import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtaCarrierAttachement } from './add-ata-carrier-attachement';

describe('AddAtaCarrierAttachement', () => {
  let component: AddAtaCarrierAttachement;
  let fixture: ComponentFixture<AddAtaCarrierAttachement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAtaCarrierAttachement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAtaCarrierAttachement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
