import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAtaCarrierAttachemet } from './list-ata-carrier-attachemet';

describe('ListAtaCarrierAttachemet', () => {
  let component: ListAtaCarrierAttachemet;
  let fixture: ComponentFixture<ListAtaCarrierAttachemet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAtaCarrierAttachemet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAtaCarrierAttachemet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
