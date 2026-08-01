import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPolicyAttachemnt } from './list-of-policy-attachemnt';

describe('ListOfPolicyAttachemnt', () => {
  let component: ListOfPolicyAttachemnt;
  let fixture: ComponentFixture<ListOfPolicyAttachemnt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfPolicyAttachemnt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfPolicyAttachemnt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
