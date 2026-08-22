import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtaBond } from './add-ata-bond';

describe('AddAtaBond', () => {
  let component: AddAtaBond;
  let fixture: ComponentFixture<AddAtaBond>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAtaBond]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAtaBond);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
