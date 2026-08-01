import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePoliccy } from './delete-policcy';

describe('DeletePoliccy', () => {
  let component: DeletePoliccy;
  let fixture: ComponentFixture<DeletePoliccy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePoliccy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePoliccy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
