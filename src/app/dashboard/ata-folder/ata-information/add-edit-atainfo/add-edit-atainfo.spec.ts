import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditATAInfo } from './add-edit-atainfo';

describe('AddEditATAInfo', () => {
  let component: AddEditATAInfo;
  let fixture: ComponentFixture<AddEditATAInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditATAInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditATAInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
