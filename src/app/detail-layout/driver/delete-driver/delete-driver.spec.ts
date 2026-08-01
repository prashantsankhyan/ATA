import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDriver } from './delete-driver';

describe('DeleteDriver', () => {
  let component: DeleteDriver;
  let fixture: ComponentFixture<DeleteDriver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDriver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDriver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
